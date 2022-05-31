import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import axios from 'axios';
import './ShowMessages.css';

const ShowMessages = () => {
  let navigate = useNavigate();
  const [users, setUsers] = useState([{}]);
  const [loader, setLoader] = useState(false);
  function getUsers() {
    axios
      .post('http://localhost:3001/get/all/users', {
        username: global.username,
      })
      .then((response) => {
        setUsers(response.data[0]);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getUsers();
    console.log('GetUsers Called ... ');
  }, []);

  const ChangePage = (username) => {
    console.log(username);
  };
  return (
    <>
      {!loader ? (
        <>
          {users.map((user_object) => (
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
                    <button
                      onClick={() => {
                        console.log(user_object.username);
                        navigate('/do/chat/' + user_object.username);
                      }}>
                      Message
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

export default ShowMessages;
