import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { postUpdated } from './postsSlice'
import { useHistory } from 'react-router-dom'

export const EditPostForm = ({ match }) => {
  const { postID } = match.params

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postID)
  )

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const dispatch = useDispatch()
  const history = useHistory()

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postUpdated({
          id: postID,
          title: title,
          content: content,
        })
      )
      history.push(`/posts/${postID}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}
