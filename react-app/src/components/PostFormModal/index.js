import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPostThunk } from "../../store/posts";
import "./PostFormModal.css";

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

    content.length > 1 ||
      images.length > 1 ||
      (formErrors.content = "Post content is required.");

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
      setHasSubmitted(false);
      closeModal();
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length <= 4) {
      setImages(selectedFiles);
      if (!content.length) {
        setContent(" ");
      }
    } else {
      alert(`Maximum 4 images allowed on a post.`);
      e.target.value = null;
    }
  };

  return (
    <>
      <div className="post-form__wrapper">
        <h3 className="post-form__title">
          Create post{" "}
          <button
            className="close-modal post-form__close-modal"
            onClick={closeModal}
          >
            <i class="fas fa-times fa-lg" />
          </button>
        </h3>
        <div className="post-form__body">
          <div className="post-form__profile-info">
            <img
              className="post-form__profile-pic"
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
              <div className="errors">{hasSubmitted && errors?.content}</div>
              <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="post-form__content-input"
              />
            </label>
            <div className="post-form__image-upload">
              <p className="image-upload-label">Add Photos:</p>
              {/* <label htmlFor="image">
                <i class="fas fa-images fa-lg"></i>
              </label> */}
              <input
                id="image"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="image-upload"
              />
            </div>
            <button className="post-form__submit-btn" type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostFormModal;
