import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePostThunk } from "../../store/posts";
// import "../DeleteReviewModal/DeleteModal.css";

const DeletePostModal = ({post}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    return dispatch(deletePostThunk(post.id))
        .then(closeModal)
  };

  return (
    <div className="modal__wrapper">
        <h2>Delete this post?</h2>
        <p>Are you sure you want to delete this post?</p>
        <button onClick={closeModal} className="delete-modal__yes-btn">Cancel</button>
        <button onClick={handleDelete} className="delete-modal__no-btn">Delete</button>
    </div>
  )
};

export default DeletePostModal;
