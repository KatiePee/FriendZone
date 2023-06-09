import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import OpenModalButton from '../OpenModalButton';
import DeleteCommentModal from '../DeleteCommentModal';
import { useModal } from "../../context/Modal"
import { allPostsThunk, editCommentThunk, userPostsThunk } from '../../store/posts';
import './Comments.css'

const Comment = ({ comment }) => {
  const { id } = comment
  const user = useSelector(state => state.session.user)
  const stateComment = useSelector(state => state.posts.allPosts[comment.postId].comments.find(comment => comment.id === id).content)

  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(stateComment);
  const history = useHistory()

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

  const redirectUserProfile = async (e) => {
    closeModal()
    await dispatch(userPostsThunk(comment.commentAuthor.id))
    history.push(`/${comment.commentAuthor.id}`)
  }

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
    <div className='comment__wrapper'>
      <div className="post-card__profile-info">
        <div className="profile-info__left-side">
          <img
            className="post-card__profile-pic"
            src={comment.commentAuthor.profilePicURL}
            alt="profile pic"
            onClick={redirectUserProfile}
          />
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
      <div className="post-card__comment-content">
        {" "}
          <p onClick={redirectUserProfile}>
            {comment.commentAuthor.firstName}{" "}
            {comment.commentAuthor.lastName}
          </p>
        {editedComment}{" "}
      </div>
    </div>
    </>
  );
};

export default Comment;
