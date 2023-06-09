import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { allPostsThunk } from "../../store/posts";
import PostCard from "../PostCard";
import OpenModalButton from '../OpenModalButton'
import "./homepage.css"
import PostFormModal from "../PostFormModal";
import CreatePost from "../CreatePost/CreatePost";
import SideNav from "../SideNav";
import FriendsBar from "../FriendsSideBar";
import { othersFriendsThunk } from "../../store/friends";


function HomePage() {
  const dispatch = useDispatch();
  const postsState = useSelector(state => state.posts.allPosts)
  const user = useSelector(state => state.session.user)
  const posts = postsState ? Object.values(postsState).reverse() : [];

  useEffect(() => {
    dispatch(allPostsThunk());
    dispatch(othersFriendsThunk(user.id))
  }, [dispatch])

  if (!user) {
    return <Redirect to='/' />
  }

  if (!posts.length) return null;
  // return (<h1>HomePage!</h1>)
  return (
    <div className="home-page-wrapper">
      <div className="home-page__side-nav">
        <SideNav />
      </div>
      <div className="home-page__post-feed">
        <CreatePost />
        {posts.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
      <div className="home-page__right-nav">
        <FriendsBar />
      </div>
    </div>
  )
}
export default HomePage
