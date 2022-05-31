import React from 'react';
import { useAuth } from '../auth';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
// import { Link } from "react-router-dom";

const Navbar = () => {
  const auth = useAuth();
  let navigate = useNavigate();

  global.username = localStorage.getItem('username');

  const go_to_login = () => {
    navigate('/');
    // Use Local Storage Here
    localStorage.setItem('username', '');
    global.username = localStorage.getItem('username');
    auth.logout(null);
  };

  return (
    <>
      {global.username && (
        <nav className='navbar navbar-expand-lg navbar-light bg-red sticky-top '>
          <div className='container-fluid'>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarTogglerDemo03'
              aria-controls='navbarTogglerDemo03'
              aria-expanded='false'
              aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon' />
            </button>
            <Link className='navbar-brand' to='/home'>
              Instagram
            </Link>
            <div className='collapse navbar-collapse' id='navbarTogglerDemo03'>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/createpost'>
                    Create Post
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link className='nav-link' to='/users'>
                    Users
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/following'>
                    Following
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to={'/user/' + global.username}>
                    Profile
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link className='nav-link' to={'/message/' + global.username}>
                    Message
                  </Link>
                </li>
              </ul>
              {global.username && (
                <button
                  className='btn btn-outline-warning'
                  onClick={go_to_login}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
