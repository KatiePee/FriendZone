import React, { useEffect, useState } from "react"
import "./postcard.css"

function PostCard({ post }) {
  const { id, content, likes, user, postImages, liked_by, comments, createdAt } = post
  const { firstName, lastName, profilePicURL } = user

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

console.log(postImages)

  return (
    <div className="post-card__container">
      <div className="post-card__info-content">
        <div className="post-card__user-info">
          <div className="post-card__profile-info">
            <img src={profilePicURL} alt="profile" />
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
        <div className="post-card__engagement">{likes <= 0 ? "" : likes}</div>
        <div className="post-card__buttons"></div>
        <div className="post-card__comment-bar"></div>
      </div>
    </div>
  )
}

export default PostCard
