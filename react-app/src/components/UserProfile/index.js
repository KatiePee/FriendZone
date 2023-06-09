import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { singlePostThunk, userPostsThunk } from "../../store/posts";
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
  useEffect(() => {
    dispatch(singleUserThunk(userId))
    dispatch(userPostsThunk(userId));
    dispatch(othersFriendsThunk(userId))
  }, [dispatch]);

  if (!currentUser) return null
  const isUser = userId == currentUser.id
  let isFriend = Object.keys(friendsObj).includes(`${currentUser.id}`)




  const addFriend = () => {
    dispatch(addFriendThunk(userId))
    // dispatch(othersFriendsThunk(userId))
  }
  const unFriend = () => {
    dispatch(unFriendThunk(userId))
    // dispatch(othersFriendsThunk(userId))
  }
  const redirectUserProfile = (userId) => {
    dispatch(singleUserThunk(userId))
    dispatch(userPostsThunk(userId));
    dispatch(othersFriendsThunk(userId))
    history.push(`/users/${userId}`)
  }

  if (!posts.length) return (
    <div className="home-page-wrapper">
      <div className="user__info">
        <img className="cover-photo" src={coverPhotoURL} />
        <div>
          <img className="post-card__profile-pic" src={profilePicURL} />
          <p>{firstName} {lastName}</p>
          <p>{`${friends.length} friends`}</p>
          {/* having a lot of bugs when trying to hid the button from the user.... moving on... */}
        </div>
        {!isUser && isFriend && (<button onClick={unFriend}>Unfriend</button>)}
        {!isUser && !isFriend && (<button onClick={addFriend}>Add Friend</button>)}
      </div>
      <div className='user-profile-page'>
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
    </div>
  );
  return (

    <div className="user-profile__wrapper">
      <div className="user-profile__header">
        <div className="user-profile__cover-photo">
          <img className="cover-photo" src={coverPhotoURL} />
        </div>
        <div className="user-profile__subheader">
          <div className="user-profile__subheader-box">
            <img className="user-profile__profile-pic" src={profilePicURL} />
            <div className="user-profile__header-info">
              <p className="user-profile__name">{firstName} {lastName}</p>
              <p className="user-profile__num-friends">{`${friends.length} friends`}</p>
            </div>
          </div>
          <div className="user-profile__buttons">
            {!isUser && isFriend && (<button onClick={unFriend}>Unfriend</button>)}
            {!isUser && !isFriend && (<button onClick={addFriend}>Add Friend</button>)}
          </div>
        </div>
      </div>
      <div className='user-profile-page'>
        <div className="user-profile__leftside">
          <div className='user-profile__friends'>
            {friends.map(friend => (
              <div onClick={e => redirectUserProfile(friend.id)}>

                <img className="post-card__profile-pic" src={friend.profilePicURL} />
                <p>{friend.firstName}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="home-page-wrapper">
          {currentUser.id === +userId && <CreatePost />}
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
