import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { allPostsThunk } from "../../store/posts";
import PostCard from "../PostCard";
import OpenModalButton from '../OpenModalButton'
import "./homepage.css"
import PostFormModal from "../PostFormModal";

function HomePage() {
  const dispatch = useDispatch();
  const postsState = useSelector(state => state.posts.allPosts)
  const user = useSelector(state => state.session.user)
  const posts = postsState ? Object.values(postsState) : [];
  const { firstName, profilePicURL } = user


  useEffect(() => {
    dispatch(allPostsThunk());
  }, [dispatch])

  if (!posts.length) return null;
  // return (<h1>HomePage!</h1>)
  return (
    <div className="home-page-wrapper">
      <div className='home-page__write-post'>
        <img src={profilePicURL} className="post-card__profile-pic" />
        <OpenModalButton
          buttonText={`What's on your mind, ${firstName}?`}
          modalComponent={<PostFormModal />}
        />
      </div>
      {posts.map(post => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  )
}
export default HomePage
