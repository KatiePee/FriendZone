import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { allPostsThunk } from "../../store/posts";
import PostCard from "../PostCard";
import OpenModalButton from '../OpenModalButton'
import PostFormModal from "../PostFormModal";

function CreatePost() {
  const user = useSelector(state => state.session.user)
  const { firstName, profilePicURL } = user

  return (
    <div className='home-page__write-post'>
      <img src={profilePicURL} className="post-card__profile-pic" />
      <OpenModalButton
        buttonText={`What's on your mind, ${firstName}?`}
        modalComponent={<PostFormModal user={user} />}
      />
    </div>
  )
}

export default CreatePost