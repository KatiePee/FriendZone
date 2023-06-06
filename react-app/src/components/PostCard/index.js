import React, { useEffect, useState } from "react"
import "./postcard.css"

function PostCard({ post }) {
  const { id, content, numLikes, author, postImages, likedBy, comments, createdAt } = post
  const { firstName, lastName, profilePicURL } = author

  const [text, setText] = useState("")

  const handleInputChange = (e) => {
    setText(e.target.value);
  }

  const textareaStyle = {
    resize: 'none',
    overflow: 'hidden'
  };

  const timeAgo = (dateObj) => {
    const date = new Date(dateObj);
    const currentDate = new Date()
    const timeDif = currentDate.getTime() - date.getTime();

    const seconds = Math.floor(timeDif / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = date.toLocaleString('en-US', options);
    const dateString = `${month} ${year} at ${time}`

    if (days >= 7) return dateString
    else if (days >= 1) return `${days}d`
    else if (hours >= 1) return `${hours}d`
    else return minutes ? `${minutes}m` : '1m'

  }

  return (
    <div className="post-card__container">
      <div className="post-card__info-content">
        <div className="post-card__user-info">
          <div className="post-card__profile-info">
            <img className="post-card__profile-pic" src={profilePicURL} alt="profile" />
            <div className="profile-info__left-side">
              <p>{firstName} {lastName}</p>
              <div className="profile-info__post-date">
                <span>{timeAgo(createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="post-card__edit-delete">
            <span>EDIT</span>
            <span>DEL</span>
          </div>
        </div>
        <div className="post-card__content">
          <p>{content}</p>
        </div>
      </div>
      <div className="post-card__images">
        {postImages.map(image => {
          return <img src={image.imageUrl} />
        })}
      </div>
      <div className="post-card__details">
        <div className="post-card__engagement">{numLikes <= 0 ? "" : `❤ ${numLikes}`}</div>
        <div className="post-card__buttons">
          <span>LIKE</span>
          <span>COMMENT</span>
        </div>
        <div className="post-card__comment-bar">
          <img className="post-card__profile-pic" src={profilePicURL} alt="profile" />
          <div>
            <textarea className="add-comment" value={text} onChange={handleInputChange} rows={1}></textarea>
            <span>➡</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
