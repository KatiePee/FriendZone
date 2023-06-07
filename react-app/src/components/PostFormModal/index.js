import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import { createPostThunk } from "../../store/posts";

function PostFormModal({ user }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  // const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
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

    for (let i = 0; i < images.length; i++) {
      postFormData.append('images', images[i]);
    }

    // postFormData.append('image', images);
    console.log("🚀 ~~~~~~~~~~~~~ file: index.js:26 ~ handleSubmit ~ postFormData:", postFormData)
    for (const pair of postFormData.entries()) {
      console.log('❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️', pair[0], pair[1]);
    }

    dispatch(createPostThunk(postFormData));

    history.push("/home");
    closeModal();
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
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
            multiple
            onChange={handleImageChange}
          ></input>
        </div>
        <button type="submit">Post</button>
      </form>
    </>
  );
}

export default PostFormModal;
