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
      <h3>Edit post</h3>
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
      <form onSubmit={handleSubmit}>
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <label>
          <div className="errors">{hasSubmitted && errors?.content}</div>
          <input
            type="text"
            placeholder={`What's on your mind, ${firstName}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default EditPostModal;
