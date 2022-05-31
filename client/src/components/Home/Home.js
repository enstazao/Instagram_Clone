import React, { useState, useEffect } from 'react';
import { BsFillHeartFill, BsChat } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([{}]);
  const [likes, setLikes] = useState(0);
  const [is_liked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([{}]);
  function getposts() {
    axios
      .post('http://localhost:3001/posts', {
        username: global.username,
      })
      .then((response) => {
        for (let i = 0; i < response.data[0].length; i++) {
          Object.assign(response.data[0][i], { isLiked: 'false' });
        }
        if (response.data[0].length > 0) {
          setLikes(response.data[0][0].likes);
          setPosts(response.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getposts();
    console.log('Use Effect Runs ...');
  }, []);
  const IconClicked = (post_object) => {
    axios
      .post('http://localhost:3001/like/post', {
        liked_by: global.username,
        img_path: post_object.img_path,
      })
      .then((response) => {
        setIsLiked(response.data.isLiked);
      })
      .catch((error) => {
        console.log(error);
      });
    if (is_liked) {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].img_path === post_object.img_path) {
          posts[i].likes += 1;
          posts[i].isLiked = true;
        }
      }
    }
    setLikes(post_object.likes);
    // console.log(posts);
    setPosts(posts);
    window.location.reload(false);
  };

  // Adding Comments to the DataBase
  const AddComment = (img_path) => {
    axios
      .post('http://localhost:3001/add/comment', {
        comment_body: comment,
        img_path: img_path,
        username: global.username,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setComment('');
  };

  function getComments() {
    axios
      .post('http://localhost:3001/get/comments', {
        username: global.username,
      })
      .then((response) => {
        setComments(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getComments();
    console.log('Use Effect get comments ...');
  }, []);
  console.log(posts);
  return (
    <>
      {posts[0].img_path
        ? posts.map((post_object) => (
            <>
              <div className='instagram-card'>
                <div className='instagram-card-header'>
                  <Avatar
                    className='instagram-card-user-image'
                    name={post_object.username}
                  />
                  <Link
                    className='instagram-card-user-name'
                    to={'/user/' + post_object.username}>
                    {post_object.username}
                  </Link>
                  <br></br>
                  <div className='instagram-card-time'>
                    {/* {post_object.created_at} */}
                  </div>
                </div>
                <div className='intagram-card-image'>
                  <img
                    src={post_object.img_path}
                    height='600px'
                    width='550px'
                    alt=''
                  />
                </div>
                <div className='instagram-card-content'>
                  <p className='likes'>{post_object.likes} Likes</p>
                  <p>
                    <Link
                      className='instagram-card-content-user'
                      to={'/user/' + post_object.username}>
                      {post_object.username}
                    </Link>{' '}
                    {post_object.caption}{' '}
                  </p>
                  <Link
                    className='comments'
                    to={'/comment/' + post_object.img_path}>
                    See All Comments
                  </Link>
                </div>
                <div className='instagram-card-footer'>
                  <div className='space'>
                    <BsFillHeartFill
                      style={{
                        color: 'grey',
                        cursor: 'pointer',
                      }}
                      onClick={() => IconClicked(post_object)}
                    />
                  </div>
                  <BsChat style={{ cursor: 'pointer' }} />
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <div className='form-group container'>
                      <label htmlFor='comment'>Enter Comment</label>
                      <input
                        type='text'
                        className='form-control'
                        id='comment'
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        value={comment}
                      />
                    </div>
                    <button
                      style={{ marginLeft: '20px' }}
                      type='submit'
                      className='btn btn-primary'
                      onClick={() => AddComment(post_object.img_path)}>
                      Post
                    </button>
                    <br></br>
                    <br></br>
                    <br></br>
                  </div>
                </form>
              </div>
              <br></br>
              <br></br>
              <br></br>
            </>
          ))
        : null}
    </>
  );
};

export default Home;
