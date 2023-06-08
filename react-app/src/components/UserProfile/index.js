import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { userPostsThunk } from "../../store/posts";
import PostCard from "../PostCard";
import "../HomePage/homepage.css";
import CreatePost from "../CreatePost/CreatePost";
import { addFriendThunk, othersFriendsThunk, unFriendThunk } from "../../store/friends";
import './UserProfile.css'
import { singleUserThunk } from "../../store/users";

function UserProfile() {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts.allPosts);
  const currentUser = useSelector((state) => state.session.user);
  const friendsObj = useSelector((state) => state.friends.friends);
  const user = useSelector((state) => state.users.singleUser);
  const history = useHistory()
  const friends = Object.values(friendsObj)
  // const [isFriend, setIsFriend] = useState(false)
  const { userId } = useParams();
  const posts = postsState ? Object.values(postsState).reverse() : [];
  const { firstName, lastName, profilePicURL, coverPhotoURL } = user;
  const isUser = userId == currentUser.id

  useEffect(() => {
    dispatch(singleUserThunk(userId))
    dispatch(userPostsThunk(userId));
    dispatch(othersFriendsThunk(userId))
  }, [dispatch]);
  let isFriend = Object.keys(friendsObj).includes(userId)
  console.log('😈~😈~😈~😈~😈~😈~😈~😈~~~~~~~is friend~~~~~~', isFriend)
  if (!posts.length) return null;

  const addFriend = () => {
    dispatch(addFriendThunk(userId))
  }
  const unFriend = () => {
    dispatch(unFriendThunk(userId))
  }
  const redirectUserProfile = (userId) => {
    history.push(`/${userId}`)
  }
  console.log('~~~~~~~~~~is friend~~~~~~~~~~~', isFriend)
  return (

    <div className="home-page-wrapper">
      <div className="user__info">
        <img className="cover-photo" src={coverPhotoURL} />
        <div>
          <img className="post-card__profile-pic" src={profilePicURL} />
          <p>{firstName} {lastName}</p>
          <p>{`${friends.length} friends`}</p>
          {/* having a lot of bugs when trying to hid the button from the user.... moving on... */}
        </div>
        {isFriend && (<button onClick={unFriend}>Unfriend</button>)}
        {!isFriend && (<button onClick={addFriend}>Add Friend</button>)}
      </div>

      <div className='friends-thing'>
        {friends.map(friend => (
          <div onClick={e => redirectUserProfile(friend.id)}>

            <img className="post-card__profile-pic" src={friend.profilePicURL} />
            <p>{friend.firstName}</p>
          </div>

        ))}
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
