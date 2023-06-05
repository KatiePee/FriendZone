import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { allPostsThunk } from "../../store/posts";
import PostCard from "../PostCard";
import "./homepage.css"

function HomePage() {
  const dispatch = useDispatch();
  const postsState = useSelector(state => state.posts.allPosts)

  const posts = postsState ? Object.values(postsState) : [];



  useEffect(() => {
    dispatch(allPostsThunk());
  }, [dispatch])

  if (!posts.length) return null;
  // return (<h1>HomePage!</h1>)
  return (
    <div className="home-page-wrapper">
      {posts.map(post => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  )
}
export default HomePage
