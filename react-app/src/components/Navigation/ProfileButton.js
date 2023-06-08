import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";

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
      console.log("🚀 ~ file: ProfileButton.js:26 ~ closeMenu ~ e.target:", e.target)
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const redirectUserProfile = (e) => {
    history.push(`/${user.id}`)
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  if (!user) return null;

  return (
    <>
      <button onClick={openMenu} className="profile-button">
        <img
          src={user.profilePicURL}
          className="post-card__profile-pic"
          alt={user.firstName}
        ></img>
      </button>
      <ul className={ulClassName} ref={ulRef}>
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
              <button onClick={handleLogout}>Log Out</button>
            </li>
      </ul>
    </>
  );
}

export default ProfileButton;
