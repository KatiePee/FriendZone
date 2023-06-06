import React, { useState } from 'react';
import OpenModalButton from '../OpenModalButton';
import DeleteCommentModal from '../DeleteCommentModal';
import { useModal } from "../../context/Modal"
const Comment = ({ comment }) => {
  console.log("COMMENT COMPONENT", comment)
  const { closeModal } = useModal()
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the edited comment using an appropriate action or function
    console.log('Edited comment:', editedComment);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedComment(comment.content);
  };

  const handleTextareaChange = (e) => {
    setEditedComment(e.target.value);
  };

  if (isEditing) {
    return (
      <div>
        <textarea
          value={editedComment}
          onChange={handleTextareaChange}
        ></textarea>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </div>
    );
  }

  return (
    <>
              <div className="post-card__profile-info">
                <div className="profile-info__left-side">
                  <img
                    className="post-card__profile-pic"
                    src={comment.commentAuthor.profilePicURL}
                    alt="profile pic"
                  />
                  <p>
                    {comment.commentAuthor.firstName}{" "}
                    {comment.commentAuthor.lastName}
                  </p>
                </div>
                <div className="profile-info__right-side">
                <button onClick={handleEditClick}>Edit</button>
                  <OpenModalButton
                    buttonText="Delete"
                    onItemClick={closeModal}
                    modalComponent={<DeleteCommentModal comment={comment} />}
                  />
                </div>
              </div>
              <div className="post-card__comment-content">
                {" "}
                {comment.content}{" "}
              </div>
            </>
  );
};

export default Comment;
