const user = {
  username: 'hellas',
  password: 'password',
  name: 'H Ella',
}

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

  describe('Login', function () {
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
})
