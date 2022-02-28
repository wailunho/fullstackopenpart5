import { useState, forwardRef, useImperativeHandle } from 'react'

const AddBlogForm = forwardRef((props, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useImperativeHandle(ref, () => ({
    title,
    author,
    url,
    setTitle,
    setAuthor,
    setUrl,
  }))

  return (
    <form onSubmit={props.handleAddBlog}>
      <h2>create new</h2>
      <div>title:<input value={title} onChange={({ target }) => setTitle(target.value)} /></div>
      <div>author:<input value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
      <div>url:<input value={url} onChange={({ target }) => setUrl(target.value)} /></div>
      <button type="submit">create</button>
    </form>
  )
})

export default AddBlogForm