import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  'title': 'Fun with chinchilla',
  'author': 'John Doe',
  'url': 'https://john-doe-890.com',
  'likes': 20,
  'user': {
    'username': 'hellas',
    'name': 'H Ella',
    'id': '621c2c14e8a090cb5d453652',
  },
  'id': '621c2c14e8a090cb5d45365a',
}
const handleLike = () => {}
const handleDelete = () => {}
const currentUser = {
  id: '621c2c14e8a090cb5d453652',
}

let container

describe('<Blog />', () => {
  test('renders blog initially', () => {
    container = render(<Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} currentUser={currentUser} />).container
    const ele = screen.getByText(`${blog.title} ${blog.author}`)
    const ele2 = container.querySelector('.blog-detail')
    expect(ele).toBeDefined()
    expect(ele2).toHaveStyle('display: none')
  })
  test('renders blog after clicking "view"', () => {
    container = render(<Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} currentUser={currentUser} />).container
    const ele = screen.getByText(`${blog.title} ${blog.author}`)
    const ele2 = container.querySelector('.blog-detail')
    const button = screen.getByText('view')
    userEvent.click(button)
    expect(ele).toBeDefined()
    expect(ele2).not.toHaveStyle('display: none')
  })
  test('clicking "like" twice, the component received as props is called twice', () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLike={mockHandler} handleDelete={handleDelete} currentUser={currentUser} />)

    const button = screen.getByText('view')
    userEvent.click(button)
    const button2 = screen.getByText('like')
    userEvent.click(button2)
    userEvent.click(button2)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})