import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import title from "../../assets/friendzone-title.png";
import { useModal } from "../../context/Modal";
import SideNav from "../SideNav";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  return (
    <div>
      <ul className="nav">
        <li>
          <NavLink exact to="/home" id="logo">
            <img src={title} className="nav-title" />
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
