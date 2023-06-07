import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteCommentModal from '../DeleteCommentModal';
import { useModal } from "../../context/Modal"
import { allPostsThunk, editCommentThunk } from '../../store/posts';



const Comment = ({ comment }) => {
  const stateComment = useSelector(state => state.posts.allPosts[comment.postId].comments.find(comment => comment.id === comment.id).content)

  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(stateComment);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault()
    const updated_comment = {
      content: editedComment
    }
    await dispatch(editCommentThunk(updated_comment, comment))
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
        <form onSubmit={handleSaveClick}>
        <textarea
          value={editedComment}
          onChange={handleTextareaChange}
        ></textarea>
        <button>Save</button>
        <button onClick={handleCancelClick}>Cancel</button>
        </form>
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
        {editedComment}{" "}
      </div>
    </>
  );
};

export default Comment;
