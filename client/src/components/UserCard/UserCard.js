import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import axios from 'axios';
import './UserCard.css';
// import { withRouter } from 'react-router-dom';

const UserCard = () => {
  let navigate = useNavigate();
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [posts, setPosts] = useState([{}]);
  const [no_of_posts, setnoPosts] = useState();
  const [fullname, setFullname] = useState('');
  const username = useParams();

  function getFollowers() {
    axios
      .post('http://localhost:3001/get/user/followers', {
        username: username.username,
      })
      .then((response) => {
        console.log(response);
        setFollowers(response.data.followers);
        setFollowing(response.data.following);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getFullname() {
    axios
      .post('http://localhost:3001/get/fullname', {
        username: username.username,
      })
      .then((response) => {
        setFullname(response.data.fullname);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getPosts() {
    axios
      .post('http://localhost:3001/get/posts', {
        username: username.username,
      })
      .then((response) => {
        for (let i = 0; i < response.data.images.length; i++) {
          response.data.images[i].img_path = response.data.images[
            i
          ].img_path.slice(1);
        }
        setnoPosts(response.data.images.length);
        // console.log(response.data.images[0].img_path);
        setPosts(response.data.images);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const ChangePage = () => {
    navigate('/user/editprofile');
  };

  useEffect(() => {
    getFullname();
    console.log('Use Effect get fullname ...');
  }, []);

  useEffect(() => {
    getFollowers();
    console.log('Use Effect get followers ...');
  }, []);

  useEffect(() => {
    getPosts();
    console.log('Use Effect get posts ...');
  }, []);

  return (
    <div
      style={{
        maxWidth: '550px',
        margin: '0px auto',
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '18px 0px',
          borderBottom: '1px solid grey',
        }}>
        <div>
          <Avatar
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '80px',
              cursor: 'pointer',
            }}
            name={username.username}
          />
          <br></br>
          <br></br>
        </div>
        <div>
          <div
            style={{
              display: 'flex',
            }}>
            <h4
              style={{
                marginRight: '15px',
              }}>
              {fullname}
            </h4>
            {username.username === global.username ? (
              <button onClick={ChangePage}>Edit Profile</button>
            ) : null}
          </div>
          <h5>
            <b>{username.username}</b>
          </h5>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '108%',
            }}>
            <h6>{no_of_posts} posts</h6>
            <h6>{followers} followers</h6>
            <h6>{following} following</h6>
          </div>
        </div>
      </div>
      {posts.map((post_object) => (
        <>
          <div className='gallery'>
            <img className='item' src={post_object.img_path} alt='User Posts' />
          </div>
        </>
      ))}
    </div>
  );
};

export default UserCard;
