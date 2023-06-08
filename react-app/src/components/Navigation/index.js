import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
    <div>
      <ul className='nav'>
        <li>
          <NavLink exact to="/home" id="logo">friendzone</NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
        <div className='nav__left-side'>Content</div>
    </div>
	);
}

export default Navigation;
