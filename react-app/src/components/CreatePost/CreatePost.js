import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { allPostsThunk } from "../../store/posts";
import PostCard from "../PostCard";
import OpenModalButton from '../OpenModalButton'
import PostFormModal from "../PostFormModal";
import "./createpost.css"
function CreatePost() {
  const user = useSelector(state => state.session.user)
  const { firstName, profilePicURL } = user

  return (
    <div className='home-page__write-post'>

      <img src={profilePicURL} className="post-card__profile-pic" />
      <OpenModalButton
        buttonText={<input className="home-page__comment-bar"  rows={1} placeholder="Write a comment..."></input>}
        modalComponent={<PostFormModal user={user} />}
      />
    </div>
  )
}

export default CreatePost
