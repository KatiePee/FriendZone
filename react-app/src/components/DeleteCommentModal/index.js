import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteCommentThunk } from "../../store/posts";
// import "../DeleteReviewModal/DeleteModal.css";

const DeleteCommentModal = ({comment}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    return dispatch(deleteCommentThunk(comment))
        .then(closeModal)
  };

  return (
    <div className="modal__wrapper">
        <h2>Delete Comment?</h2>
        <p>Are you sure you want to delete this comment?</p>
        <button onClick={closeModal} className="delete-modal__yes-btn">No</button>
        <button onClick={handleDelete} className="delete-modal__no-btn">Delete</button>
    </div>
  )
};

export default DeleteCommentModal;
