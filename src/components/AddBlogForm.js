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
    <form id="addBlogForm" onSubmit={props.handleAddBlog}>
      <h2>create new</h2>
      <div>title:<input id="title" value={title} onChange={({ target }) => setTitle(target.value)} /></div>
      <div>author:<input id="author" value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
      <div>url:<input id="url" value={url} onChange={({ target }) => setUrl(target.value)} /></div>
      <button type="submit">create</button>
    </form>
  )
})

AddBlogForm.displayName = 'AddBlogForm'

export default AddBlogForm