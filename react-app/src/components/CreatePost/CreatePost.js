import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { allPostsThunk } from "../../store/posts";
import PostCard from "../PostCard";
import OpenModalButton from '../OpenModalButton'
import PostFormModal from "../PostFormModal";
import "./CreatePost.css"

function CreatePost() {
  const user = useSelector(state => state.session.user)
  const { firstName, profilePicURL } = user

  return (
    <div className='home-page__write-post'>
      <div className="write-post__upper-half">
        <img src={profilePicURL} className="post-card__profile-pic" alt="profilepic" />
        <OpenModalButton
          buttonText={<input disabled className="home-page__comment-bar add-comment"  rows={1} placeholder={`What's on your mind, ${firstName}?`}></input>}
          modalComponent={<PostFormModal user={user} />}
        />
      </div>
      <div className="write-post__lower">
      <div>
        <OpenModalButton
          buttonText={<div>
            <i className="fas fa-paint-brush" style={{color: "#f02849"}}></i>
            <span> Post</span>
              </div>}
          modalComponent={<PostFormModal user={user} />}
        />
        </div>
        <div>
        <OpenModalButton
          buttonText={<div>
            <i className="fas fa-images fa-lg" style={{color: "#45bd62"}}></i>
            <span> Photos</span>
              </div>}
          modalComponent={<PostFormModal user={user} />}
        />
        </div>
        <div>
          <OpenModalButton
            buttonText={<div>
              <i className="fas fa-laugh-beam fa-lg" style={{color: "#f7b928"}}></i>
              <span> Feeling/Activity</span>
                </div>}
            modalComponent={<PostFormModal user={user} />}
          />
        </div>
      </div>
    </div>
  )
}

export default CreatePost
