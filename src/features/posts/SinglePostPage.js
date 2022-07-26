import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import {selectPostById} from "./postsSlice";

const SinglePostPage = ({ match }) => {
  console.log(match)
  const { postID } = match.params

  const post = useSelector(state => selectPostById(state, postID))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <div>
          <TimeAgo timestamp={post.date}></TimeAgo>
          <PostAuthor userId={post.user}></PostAuthor>
        </div>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}

export default SinglePostPage
