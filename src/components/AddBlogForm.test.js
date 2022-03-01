import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

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
const handleAddBlog = () => {}

let container

describe('<AddBlogForm />', () => {
  test('clicking "like" twice, the component received as props is called twice', () => {
    const mockHandler = jest.fn()

    render(<AddBlogForm handleAddBlog={handleAddBlog}  />)

    const button = screen.getByText('view')
    userEvent.click(button)
    const button2 = screen.getByText('like')
    userEvent.click(button2)
    userEvent.click(button2)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})