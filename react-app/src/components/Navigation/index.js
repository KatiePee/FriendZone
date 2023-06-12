import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import title from "../../assets/friendzone-title.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div>
      <ul className="nav">
        <li>
          <NavLink exact to="/home" id="logo">
            <img src={title} className="nav-title" alt="nav" />
          </NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>

    </div>
  );
}

export default Navigation;
