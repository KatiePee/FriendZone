import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editPostThunk } from "../../store/posts";
import "./EditPostModal.css";

function EditPostModal({ user, post }) {
  const dispatch = useDispatch();
  const editPost = useSelector((state) => state.posts.allPosts[post.id]);
  const [content, setContent] = useState(editPost.content);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();
  const { firstName, lastName, profilePicURL } = user;
  const { id } = post;

  useEffect(() => {
    const formErrors = {};

    content.length > 1 || (formErrors.content = "Post content is required.");

    content.length <= 2040 ||
      (formErrors.content = "Maximum 2040 characters allowed in a post.");
    setErrors(formErrors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!Object.values(errors).length) {
      const updated_post = {
        content,
      };
      await dispatch(editPostThunk(updated_post, id));
      setErrors({});
      setHasSubmitted(false);
      closeModal();
    }
  };

  return (
    <>
      <div className="post-form__wrapper">
        <h3 className="post-form__title">
          Edit post
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
        <form onSubmit={handleSubmit}>
          <label>
            <div className="errors">{hasSubmitted && errors?.content}</div>
            <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="post-form__content-input"
              />
          </label>
          <button className="post-form__submit-btn" type="submit">Save</button>
        </form>
        </div>
      </div>
    </>
  );
}

export default EditPostModal;
