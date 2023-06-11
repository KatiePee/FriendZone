import "./friendsbar.css"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { singleUserThunk } from "../../store/users";
import { myHomiesThunk, othersFriendsThunk } from "../../store/friends";
import { userPostsThunk } from "../../store/posts";

export default function FriendsBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const friendsObj = useSelector((state) => state.friends.homies);
  const friends = Object.values(friendsObj);

  const redirectUserProfile = (userId) => {
    dispatch(singleUserThunk(userId));
    dispatch(userPostsThunk(userId));
    dispatch(myHomiesThunk(userId));
    history.push(`/users/${userId}`);
  }

  return (
    <div className='user-profile__friends friends-bar'>
      <p>FriendZoned</p>
      {friends.map(friend => (
        <div className="friends-bar__friends" onClick={e => redirectUserProfile(friend.id)}>

          <img className="post-card__profile-pic" src={friend.profilePicURL} />
          <p>{friend.firstName}</p>
        </div>
      ))}
    </div>
  )
}
