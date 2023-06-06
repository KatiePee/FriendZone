import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom'

import { createPostThunk } from "../../store/posts";

function PostFormModal({user}) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()
  const {firstName, lastName, profilePicURL} = user

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length > 1) {
      const post = {
        content
      }
      dispatch(createPostThunk(post))
      history.push('/home')
      closeModal()
    } else {
      setErrors([
        "Post Cannot Be Blank!",
      ]);
    }
  };

  return (
    <>
      <h3>Create post</h3>
      <div className="post-card__profile-info">
        <img className="post-card__profile-pic" src={profilePicURL} alt="profile" />
        <div className="profile-info__left-side">
          <p>{firstName} {lastName}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <input
            type="text"
            placeholder={`What's on your mind, ${firstName}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <button type="submit">Post</button>
      </form>
    </>
  );
}

export default PostFormModal;
