import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom'
import { allPostsThunk, editPostThunk, singlePostThunk} from "../../store/posts";
// import "../DeleteReviewModal/DeleteModal.css";

function EditPostModal({user, post}) {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const history = useHistory()
    const editPost = useSelector(state => state.posts.allPosts)
    const {firstName, lastName, profilePicURL} = user
    const {id} = post

    //Bring in the old content but how??
    // useEffect(() => {
    //     dispatch(singlePostThunk(id))
    //     .then(data => {
    //         setContent(data.content)
    //     })
    // })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content.length > 1) {
            const updated_post = {
                content
            };
        await dispatch(editPostThunk(updated_post, id))
        closeModal()
      } else {
        setErrors([
          "Post Cannot Be Blank!",
        ]);
      }
    };

    return (
      <>
        <h3>Edit post</h3>
        <div className="post-card__profile-info">
          <img className="post-card__profile-pic" src={profilePicURL} alt="profile" />
          <div className="profile-info__left-side">
            <p>{firstName} {lastName}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            <input
              type="text"
              placeholder={`What's on your mind, ${firstName}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </>
    );
  }

  export default EditPostModal;
