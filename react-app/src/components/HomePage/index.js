import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { allPostsThunk } from "../../store/posts";
import PostCard from "../PostCard";
import OpenModalButton from '../OpenModalButton'
import "./homepage.css"
import PostFormModal from "../PostFormModal";
import CreatePost from "../CreatePost/CreatePost";



function HomePage() {
  const dispatch = useDispatch();
  const postsState = useSelector(state => state.posts.allPosts)
  const user = useSelector(state => state.session.user)
  const posts = postsState ? Object.values(postsState).reverse() : [];

  useEffect(() => {
    dispatch(allPostsThunk());
  }, [dispatch])

  if (!user) {
    return <Redirect to='/' />
  }

  if (!posts.length) return null;
  // return (<h1>HomePage!</h1>)
  return (
    <div className="home-page-wrapper">
      <CreatePost />
      {posts.map(post => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  )
}
export default HomePage
