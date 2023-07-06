import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import title from "../../assets/friendzone-title.png";
import { allUsersThunk } from "../../store/users";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);
  const allUsers = useSelector((state => state.users.allUsers));
  const [userQuery, setUserQuery] = useState("")

console.log(userQuery)
const foundUsers = Object.values(allUsers).filter(user => user.firstName.toLowerCase().startsWith(userQuery.toLowerCase()));
// %userQuery%
console.log(foundUsers)

  useEffect(() => {
    dispatch(allUsersThunk());
  }, [dispatch])

  const handleQuery = async (e) => {
    await  setUserQuery(e.target.value);

    console.log("🚀 ~ file: index.js:24 ~ handleQuery ~ userQuery:", userQuery)
    console.log("🚀 ~ file: index.js:24 ~ handleQuery ~ users....", allUsers);
    console.log(foundUsers);
  }

  return (
    <div>
      <ul className="nav">
        <li>
          <NavLink exact to="/home" id="logo">
            <img src={title} className="nav-title" alt="nav" />
          </NavLink>
        </li>
        <li classname="nav__searchbar-wrapper">
          <i className="fas fa-search nav__searchbar-icon"></i>
          <input className="nav__search-input" type="search" placeholder="search users..."
          onChange={e => setUserQuery(e.target.value)} />
          {/* if input AND filter result is  not empty then return div else  null */}
          {userQuery ? <div>{foundUsers[0]?.firstName}</div> : null}

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
