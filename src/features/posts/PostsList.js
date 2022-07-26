import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import {selectAllPosts, fetchPosts} from "./postsSlice";
import {Spinner} from "../../components/Spinner";

const PostExcerpt = ({post}) => {
    return (
        <article className="post-excerpt"
                     key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <TimeAgo timestamp={post.date}></TimeAgo>
                <PostAuthor userId={post.user}></PostAuthor>
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post}></ReactionButtons>
            <Link to={`/posts/${post.id}`}
                  className="button muted=button">
                View post
            </Link>
        </article>
    )
}

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch])

    console.log('render list')
    let content;

    if (postStatus === 'loading') {
        content = <Spinner text='loading...' />
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

        content = orderedPosts.map(post => <PostExcerpt post={post}></PostExcerpt>)
    }

    return (
        <section className="posts=list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList
