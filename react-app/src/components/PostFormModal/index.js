import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import { createPostThunk } from "../../store/posts";

function PostFormModal({ user }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();
  const { firstName, lastName, profilePicURL } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = {};

    post.content = content.length && content

    const postFormData = new FormData();
    postFormData.append('content', content);
    postFormData.append('image', image);
    console.log("🚀 ~ file: index.js:26 ~ handleSubmit ~ postFormData:", postFormData)


    // const imageFormData = new FormData();
    // imageFormData.append('images', image);
    // console.log("🚀 ~ file: index.js:30 ~ handleSubmit ~ imageFormData:", imageFormData)


    // const formData = new FormData()

    // formData.append("content", content)
    // // formData.append("author", currentUser.id)
    // formData.append("image", image)
    // console.log("🚀 ~ file: index.js:29 ~ handleSubmit ~ formData:", formData)

    dispatch(createPostThunk(postFormData));

    // dispatch(createPostThunk(post));
    history.push("/home");
    closeModal();
    // else {
    //   setErrors(["Post Cannot Be Blank!"]);
    // }
  };

  return (
    <>
      <h3>Create post</h3>
      <div className="post-card__profile-info">
        <img
          className="post-card__profile-pic"
          src={profilePicURL}
          alt="profile"
        />
        <div className="profile-info__left-side">
          <p>
            {firstName} {lastName}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        <div className="form-input-box">
          <label className="form-label" htmlFor="image">
            Post Image:
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
        </div>
        <button type="submit">Post</button>
      </form>
    </>
  );
}

export default PostFormModal;
