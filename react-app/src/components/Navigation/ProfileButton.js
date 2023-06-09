import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import { cleanUpStoreThunk } from "../../store/posts";
import { cleanUpFriendsThunk } from "../../store/friends";
import { singleUserThunk } from "../../store/users";
import { userPostsThunk } from "../../store/posts";
import { othersFriendsThunk } from "../../store/friends";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  // const user = useSelector(state => state.session.user)
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const redirectUserProfile = (e) => {
    dispatch(singleUserThunk(user.id));
    dispatch(userPostsThunk(user.id));
    dispatch(othersFriendsThunk(user.id));
    history.push(`/users/${user.id}`);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    await dispatch(cleanUpFriendsThunk());
    await dispatch(cleanUpStoreThunk());
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  if (!user) return null;

  return (
    <>
      <img
        onClick={openMenu}
        src={user.profilePicURL}
        className="post-card__profile-pic"
        alt={user.firstName}
      ></img>
      <ul onClick={closeMenu} className={ulClassName} ref={ulRef}>
        <div className="profile-dropdown-link" onClick={redirectUserProfile}>
          <img
            src={user.profilePicURL}
            className="profile-dropdown-pic"
            alt={user.firstName}
          ></img>
          <li>
            {user.firstName} {user.lastName}
          </li>
        </div>
        <li className="profile-dropdown-logout">
          <button onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" />
            <p>Log Out</p>
          </button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
