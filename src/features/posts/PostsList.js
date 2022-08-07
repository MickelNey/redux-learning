import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import {selectAllPosts} from "./postsSlice";

const PostsList = () => {
    const posts = useSelector(selectAllPosts)
    console.log('render list')
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    const renderedPosts = orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <TimeAgo timestamp={post.date}></TimeAgo>
                <PostAuthor userId={post.user}></PostAuthor>
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post}></ReactionButtons>
            <Link to={`/posts/${post.id}`} className="button muted=button">
                View post
            </Link>
        </article>
    ))

    return (
        <section className="posts=list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList
