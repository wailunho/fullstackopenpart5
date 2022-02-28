import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [isShown, setIsShown] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleToggleView = () => {
    setIsShown(!isShown)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button type="button" onClick={handleToggleView}>{isShown ? 'hide' : 'view'}</button>
      <div style={{ display: isShown ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={handleLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={{ display: currentUser.username === blog.user.username ? '' : 'none' }}>
          <button onClick={handleDelete(blog)}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default Blog