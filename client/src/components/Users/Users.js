import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import './Users.css';

const Users = () => {
  // username, fullname
  let [userinfo, setUserinfo] = useState([]);
  const [loader, setLoader] = useState(false);

  // Function Fired on Click of Follow Button
  function Follow(username) {
    axios
      .post('http://localhost:3001/followers', {
        username: username,
        logedin_username: global.username,
      })
      .then((response) => {
        if (response.data.message) {
          console.log('Data Not Inserted ...');
        } else {
          console.log('Data Inserted Successfully ...');
        }
      });
    userinfo = userinfo.filter((data) => data.username !== username);
    setUserinfo(userinfo);
  }
  // Getting the username, fullname from the database
  function getusername_fullname() {
    setLoader(true);
    axios
      .post('http://localhost:3001/users', {
        username: global.username,
      })
      .then((response) => {
        response.data[0] = response.data[0].filter(
          (data) => data.username !== global.username
        );
        // console.log(response.data[0]);
        setUserinfo(response.data[0]);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  }

  // Call the Function One Time
  useEffect(() => {
    getusername_fullname();
    console.log('Use Effect Runs ...');
  }, []);

  return (
    <>
      {!loader ? (
        <>
          {userinfo.map((user_object) => (
            <div className='container'>
              <div className='wrapper'>
                <div className='profile-image'>
                  <Avatar size='100' name={user_object.fullname} round='20px' />
                </div>
                <div className='profile-info'>
                  <div className='info'>
                    <h3 className='name'>{user_object.username}</h3>
                    <h5 className='username'>{user_object.fullname}</h5>
                  </div>
                  <div className='unfollow'>
                    <button onClick={() => Follow(user_object.username)}>
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default Users;
