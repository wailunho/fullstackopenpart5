import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const MESSAGE_TYPE_SUCCESS = 'success'
const MESSAGE_TYPE_ERROR = 'error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState(MESSAGE_TYPE_SUCCESS)
  const [isBlogFormVisible, setIsBlogFormVisible] = useState(false)

  const addBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs),
    )
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user) {
      const u = JSON.parse(user)
      setUser(u)
      blogService.setToken(u.token)
    }
  }, [])

  const showMsg = (msg) => {
    setMessage(msg)
    setTimeout(() => {setMessage('')}, 5000)
  }

  const showSuccessMsg = (msg) => {
    setMessageType(MESSAGE_TYPE_SUCCESS)
    showMsg(msg)
  }

  const showErrorMsg = (msg) => {
    setMessageType(MESSAGE_TYPE_ERROR)
    showMsg(msg)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (e) {
      showErrorMsg('Wrong credentials')
    }
  }

  const handleAddBlog = async (e) => {
    e.preventDefault()
    try {
      const c = addBlogFormRef.current
      const newBlog = await blogService.create({
        title:c.title,
        author: c.author,
        url: c.url
      })
      setBlogs(blogs.concat(newBlog))
      showSuccessMsg(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      c.setTitle('')
      c.setAuthor('')
      c.setUrl('')
      setIsBlogFormVisible(false)
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        showErrorMsg(e.response.data.error)
      } else {
        showErrorMsg(e.message)
      }
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={messageType} />
        <form onSubmit={handleLogin}>
          <div>username <input onChange={({ target }) => setUsername(target.value)} value={username} /></div>
          <div>password <input type="password" onChange={({ target }) => setPassword(target.value)} value={password} /></div>
          <div>
            <button type="submit">login</button>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} type={messageType} />
        <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
        <br></br>
        <button style={{display: isBlogFormVisible ? 'none': ''}} onClick={() => setIsBlogFormVisible(true)}>new note</button>
        <div style={{ display: isBlogFormVisible ? '' : 'none' }}>
          <AddBlogForm ref={addBlogFormRef} handleAddBlog={handleAddBlog}/>
        </div>
        <button style={{display: isBlogFormVisible? '': 'none'}} onClick={() => setIsBlogFormVisible(false)}>cancel</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />,
        )}
      </div>
    )
  }
}

export default App