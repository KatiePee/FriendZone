import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteCommentModal from "../DeleteCommentModal";
import { useModal } from "../../context/Modal";
import { editCommentThunk, userPostsThunk } from "../../store/posts";
import "./Comments.css";

const Comment = ({ comment }) => {
  const { id } = comment;
  const user = useSelector((state) => state.session.user);
  const stateComment = useSelector(
    (state) =>
      state.posts.allPosts[comment.postId].comments.find(
        (comment) => comment.id === id
      ).content
  );

  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(stateComment);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const history = useHistory();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (editedComment.length && !Object.values(errors).length) {
      const updated_comment = {
        content: editedComment,
      };
      await dispatch(editCommentThunk(updated_comment, comment));
      setIsEditing(false);
      setHasSubmitted(false);
      setErrors({});
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedComment(comment.content);
  };

  const handleTextareaChange = (e) => {
    setEditedComment(e.target.value);
  };

  const redirectUserProfile = async (e) => {

    closeModal();
    await dispatch(userPostsThunk(comment.commentAuthor.id));
    history.push(`/${comment.commentAuthor.id}`);
  };

  useEffect(() => {
    const formErrors = {};
    editedComment.length > 1 || (formErrors.comment = "Comment text is required.");
    editedComment.length <= 255 ||
    (formErrors.comment = "Maximum 255 characters allowed in a comment.");
    setErrors(formErrors);
  }, [editedComment]);


  if (isEditing) {
    return (
      <>
        <div>
          <form onSubmit={handleSaveClick}>
            <textarea
              value={editedComment}
              onChange={handleTextareaChange}
            ></textarea>
            <button>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </form>
        </div>
        <div className="errors edit-comment__errors">
          {hasSubmitted && errors?.comment}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="comment__wrapper">
        <div className="post-card__profile-info">
          <img
            className="comment__profile-pic"
            src={comment.commentAuthor.profilePicURL}
            alt="profile pic"
            onClick={redirectUserProfile}
          />
        </div>
        <div className="comment__bubble">
          <p onClick={redirectUserProfile} className="comment__author">
            {comment.commentAuthor.firstName} {comment.commentAuthor.lastName}
          </p>
          <p className="comment__content">{editedComment}</p>
        </div>
        {user.id === comment.userId && (
          <div className="profile-info__right-side">
            <button onClick={handleEditClick}>Edit</button>
            <OpenModalButton
              buttonText="Delete"
              onItemClick={closeModal}
              modalComponent={<DeleteCommentModal comment={comment} />}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
