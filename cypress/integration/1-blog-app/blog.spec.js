import user from '../../fixtures/user.json'
import blog from '../../fixtures/blog.json'
import blog2 from '../../fixtures/blog2.json'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#login').should('be.visible')
  })

  describe.skip('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('hellas')
      cy.get('#password').type('password')
      cy.get('#login button').click()
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('hellas')
      cy.get('#password').type('wrong')
      cy.get('#login button').click()
      cy.contains('Wrong credentials')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', user).then(res => {
        localStorage.setItem('user', JSON.stringify(res.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('new author')
      cy.get('#url').type('http://some-url.com')
      cy.get('#addBlogForm button').click()
      cy.contains('a new blog new title by new author added')
      cy.get('.blog').last().contains('new title new author')
    })

    describe('when a blog has created', function () {
      beforeEach(function () {
        const auth = {
          'bearer': JSON.parse(localStorage.getItem('user')).token,
        }
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: blog,
          auth,
        }).then(() => {
          cy.visit('http://localhost:3000')
        })
      })
      it('a blog can be liked', function () {
        cy.get('.blog').last().as('blog')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').contains('likes 0')
        cy.get('@blog').find('.blog-like-btn').click()
        cy.get('@blog').contains('likes 1')
      })
      it('a blog can be deleted by owner', function () {
        cy.get('.blog').last().as('blog')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').contains('remove').click()
        cy.get('.blog').should('not.exist')
      })
    })
    describe('when 2 blogs have created', function () {
      beforeEach(function () {
        const auth = {
          'bearer': JSON.parse(localStorage.getItem('user')).token,
        }
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: blog,
          auth,
        }).then(() => {
          return cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/blogs',
            body: blog2,
            auth,
          })
        }).then(() => {
          cy.visit('http://localhost:3000')
        })
      })
      it('blogs are ordered according to likes with the blog with the most likes being first', function () {
        cy.get('.blog').first().contains(blog.title)
        cy.get('.blog').last().contains(blog2.title)
        cy.get('.blog').last().contains('view').click()
        cy.get('.blog').last().find('.blog-like-btn').click()
        cy.wait(1000)
        cy.get('.blog').first().contains(blog2.title)
        cy.get('.blog').last().contains(blog.title)
      })
    })
  })
})
