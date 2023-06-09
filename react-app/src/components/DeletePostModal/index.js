import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePostThunk } from "../../store/posts";
// import "../DeleteReviewModal/DeleteModal.css";

const DeletePostModal = ({ post }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    return dispatch(deletePostThunk(post.id))
      .then(closeModal)
  };

  return (
    <div className='post-form__wrapper'>
      <h3 className="post-form__title">
        Delete post{" "}
        <button
          className="close-modal post-form__close-modal"
          onClick={closeModal}
        >
          <i class="fas fa-times fa-lg" />
        </button>
      </h3>
      <div className="modal__wrapper">
        <div className="post-form__body">
          <p>Are you sure you want to delete this post?</p>
          <div className="delete-modal__buttons">
            <button onClick={closeModal} className="delete-modal__yes-btn">Cancel</button>
            <button onClick={handleDelete} className="delete-modal__no-btn">Delete</button>
          </div>
        </div>
      </div>

    </div >
  )
};

export default DeletePostModal;
