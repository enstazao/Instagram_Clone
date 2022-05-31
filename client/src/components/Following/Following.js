import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';

const Following = () => {
  let [following, setFollowing] = useState([{}]);
  const [loader, setLoader] = useState(false);

  const UnFollow = (username) => {
    axios
      .post('http://localhost:3001/delete/following', {
        unfollowed_user: username,
        unfollowed_by: global.username,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    following = following.filter((data) => data.username !== username);
    setFollowing(following);
  };

  function GetFollowing() {
    axios
      .post('http://localhost:3001/get/user/following', {
        username: global.username,
      })
      .then((response) => {
        response.data[0] = response.data[0].filter(
          (data) => data.username !== global.username
        );
        setFollowing(response.data[0]);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    GetFollowing();
    console.log('Use Effect Get Following Called ...');
  }, []);

  return (
    <>
      {!loader ? (
        <>
          {following.map((user_object) => (
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
                    <button onClick={() => UnFollow(user_object.username)}>
                      UnFollow
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

export default Following;
