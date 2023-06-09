import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPostThunk } from "../../store/posts";

function PostFormModal({ user }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();
  const { firstName, lastName, profilePicURL } = user;

  useEffect(() => {
    const formErrors = {};

    (content.length > 1 || images.length > 1) || (formErrors.content = "Post content is required.");

    content.length <= 2040 ||
      (formErrors.content = "Maximum 2040 characters allowed in a post.");
    setErrors(formErrors);
  }, [content, images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (!Object.values(errors).length) {
      const postFormData = new FormData();
      postFormData.append("content", content);

      for (let image of images) {
        postFormData.append("images", image);
      }

      await dispatch(createPostThunk(postFormData));
      // TODO: implement a loading spinner while post is being created before closing the modal?
      setErrors({});
      setHasSubmitted(false)
      closeModal();
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length <= 4) {
      setImages(selectedFiles);
      if (!content.length) {
        setContent(' ')
      }
    } else {
      alert(`Maximum 4 images allowed on a post.`);
      e.target.value = null;
    }
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
        <label>
          <div className="errors">
            {hasSubmitted && errors?.content}
          </div>
          <input
            type="text"
            placeholder={`What's on your mind, ${firstName}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
