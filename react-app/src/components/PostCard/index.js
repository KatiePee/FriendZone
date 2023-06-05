import React, { useEffect, useState } from "react"
import "./postcard.css"

function PostCard({ post }) {
  const { id, content, likes, user, postImages, liked_by, comments, createdAt } = post
  const { firstName, lastName, profilePicURL } = user

  const timeAgo = (dateObj) => {

  }


  return (
    <div className="post-card__container">
      <div className="post-card__info-content">
        <div className="post-card__user-info">
          <div className="post-card__profile-info">
            <img src={profilePicURL} alt="profile" />
            <div className="">
              <p>{firstName}</p>
              <div className="">
                <span>3d</span>
              </div>
            </div>
          </div>
          <div className="post-card_edit-exit"></div>
        </div>
        <div className="post-card__content"></div>
      </div>
      <div className="post-card__images"></div>
      <div className="post-card__details">
        <div className="post-card__engagement"></div>
        <div className="post-card__buttons"></div>
        <div className="post-card__comment-bar"></div>
      </div>
    </div>
  )
}

export default PostCard
