import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { currentUserPostsThunk } from "../../store/posts";
import PostCard from "../PostCard";
import OpenModalButton from "../OpenModalButton";
import "../HomePage/homepage.css";
import PostFormModal from "../PostFormModal";

function UserProfile() {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts.allPosts);
  const currentUser = useSelector((state) => state.session.user);
  const userId = useParams().userId;
  const posts = postsState ? Object.values(postsState) : [];
  const { firstName, profilePicURL } = currentUser;

  useEffect(() => {
    dispatch(currentUserPostsThunk(userId));
  }, [dispatch]);

  if (!posts.length) return null;
  return (
    <div className="home-page-wrapper">
      {currentUser.id === +userId && (<div className="home-page__write-post">
        <img src={profilePicURL} className="post-card__profile-pic" alt="profile pic" />
        <OpenModalButton
          buttonText={`What's on your mind, ${firstName}?`}
          modalComponent={<PostFormModal user={currentUser} />}
        />
      </div>)}
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}
export default UserProfile;
