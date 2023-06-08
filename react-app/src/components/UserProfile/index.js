import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userPostsThunk } from "../../store/posts";
import PostCard from "../PostCard";
import "../HomePage/homepage.css";
import CreatePost from "../CreatePost/CreatePost";
import { addFriendThunk, myFriendsThunk, unFriendThunk } from "../../store/friends";
import './UserProfile.css'
import { singleUserThunk } from "../../store/users";

function UserProfile() {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts.allPosts);
  const currentUser = useSelector((state) => state.session.user);
  const friendsObj = useSelector((state) => state.friends.friends);
  const friends = Object.values(friendsObj)
  // const [isFriend, setIsFriend] = useState(false)
  const userId = useParams().userId;
  const posts = postsState ? Object.values(postsState).reverse() : [];
  const user = useSelector((state) => state.users.singleUser);
  const { firstName, lastName, profilePicURL } = user;

  useEffect(() => {
    dispatch(singleUserThunk(userId))
    dispatch(userPostsThunk(userId));
    dispatch(myFriendsThunk())
  }, [dispatch]);
  let isFriend = Object.keys(friendsObj).includes(userId)

  if (!posts.length) return null;

  const addFriend = () => {
    dispatch(addFriendThunk(userId))
  }
  const unFriend = () => {
    dispatch(unFriendThunk(userId))
  }

  return (

    <div className="home-page-wrapper">
      <div className="user__info">
        <img className="post-card__profile-pic" src={profilePicURL} />
        <p>{firstName} {lastName}</p>
        {isFriend && (<button onClick={unFriend}>Unfriend</button>)}
        {isFriend || (<button onClick={addFriend}>Add Friend</button>)}

      </div>
      <div className="feed">
        { }
        {currentUser.id === +userId && <CreatePost />}
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}

      </div>
    </div>
  );
}
export default UserProfile;
