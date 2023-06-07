import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { addCommentThunk } from "../../store/posts";
import { createLikeThunk, removeLikeThunk } from "../../store/posts";
import { allPostsThunk } from "../../store/posts";
import Comment from "../Comment";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
// import "./postcard.css"
import "./postdetailmodal.css"


function PostDetailModal({ post }) {
  const {
    id,
    content,
    numLikes,
    author,
    postImages,
    likedBy,
    createdAt,
  } = post;
  const { firstName, lastName, profilePicURL } = author;
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);
  const stateComments = useSelector((state) => state.posts.allPosts[id].comments)
  const likes = useSelector(state => state.posts.allPosts[post.id].numLikes)
  const likedPeeps = useSelector(state => state.posts.allPosts[post.id].likedBy)
  const test = likedPeeps.find(liker => liker.id === user.id)
  const [text, setText] = useState("");
  const { closeModal } = useModal()

  const likeByNames = likedBy.map(obj => {
    return <span>{obj.firstName} {obj.lastName}</span>
  })
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (content.length > 1) {
      const comment = {
        "post_id": id,
        "user_id": user.id,
        "content": text
      }
      await dispatch(addCommentThunk(comment))

      setText("")
    }
  }

  let userLiked = false
  for (let i = 0; i < likedBy.length; i++) {
    let liker = likedBy[i]
    if (liker.id === user.id) userLiked = true
  }

  const [liked, setLiked] = useState(userLiked)

  const handleLike = async (e) => {
    if (!test) {
      await dispatch(createLikeThunk(post.id, user))
    } else {
      await dispatch(removeLikeThunk(post.id, user))
    }
  }

  const timeAgo = (dateObj) => {
    const date = new Date(dateObj);
    const currentDate = new Date();
    const timeDif = currentDate.getTime() - date.getTime();

    const seconds = Math.floor(timeDif / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    // const months = Math.floor(days / 30);
    // const years = Math.floor(months / 12);

    const month = date.toLocaleString("default", { month: "long" });
    const year = date.toLocaleString("default", { year: "numeric" });
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const time = date.toLocaleString("en-US", options);
    const dateString = `${month} ${year} at ${time}`;

    if (days >= 7) return dateString;
    else if (days >= 1) return `${days}d`;
    else if (hours >= 1) return `${hours}d`;
    else return minutes ? `${minutes}m` : "1m";
  };

  return (
    <div className="post-card__container">
      <div className="post-card__info-content">
        <div className="post-card__user-info">
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
              <div className="profile-info__post-date">
                <span>{timeAgo(createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="post-card__edit-delete">
            <div className="close-div" onClick={closeModal}>Close</div>
          </div>
        </div>
        <div className="post-card__content">
          <p>{content}</p>
        </div>
      </div>
      <div className="post-card__images">
        {postImages.map((image) => {
          return <img src={image.imageUrl} alt="postimage" />;
        })}
      </div>
      <div className="post-card__details">
      <div className="post-card__engagement">
            <Tippy content={<span style={{display: 'flex', flexDirection: 'column'}}>{likeByNames}</span>} placement="bottom" arrow={false}>
                <div className="post-card__likes">
                  {likes <= 0 ? "" : `❤️ ${likes}`}
                </div>
            </Tippy>
          </div>
        <div className="post-card__buttons">
        <button onClick={handleLike}>LIKE</button>
        </div>
        <div>
          {stateComments.map((comment) => (
            <Comment comment={comment} post={post}/>
          ))}
        </div>
        <div className="post-card__comment-bar">
          <img
            className="post-card__profile-pic"
            src={user.profilePicURL}
            alt="profile"
          />
          <div>
            <form onSubmit={handleSubmit}>
              <textarea
                className="add-comment"
                value={text}
                onChange={handleInputChange}
                rows={5}
              ></textarea>
              <button>➡</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailModal;
