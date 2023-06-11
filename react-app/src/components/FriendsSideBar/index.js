import "./friendsbar.css"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { singleUserThunk } from "../../store/users";
import { myHomiesThunk } from "../../store/friends";
import { userPostsThunk } from "../../store/posts";

export default function FriendsBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const friendsObj = useSelector((state) => state.friends.homies);
  const friends = friendsObj ? Object.values(friendsObj) : [];

  const redirectUserProfile = (userId) => {
    dispatch(singleUserThunk(userId));
    dispatch(userPostsThunk(userId));
    dispatch(myHomiesThunk(userId));
    history.push(`/users/${userId}`);
  }

  return (
    <div className='user-profile__friends friends-bar'>
      <p className="friends-bar__title">FriendZoned</p>
      {friends.map(friend => (
        <div className="friends-bar__friends" onClick={e => redirectUserProfile(friend.id)}>

          <img src={friend.profilePicURL} alt={`${friend.firstName} ${friend.lastName}`}/>
          <p>{friend.firstName}</p>
        </div>
      ))}
    </div>
  )
}
