import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ShowComments = () => {
  let img_path = useParams();
  const [comments, setComments] = useState([{}]);
  const [comment, setComment] = useState('');
  img_path = Object.values(img_path)[0];

  function getComments() {
    axios
      .post('http://localhost:3001/get/comments/all', {
        img_path: img_path,
      })
      .then((response) => {
        setComments(response.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getComments();
    console.log('Use Effect get comments ...');
  }, []);

  const AddComment = () => {
    if (comment === '') {
      alert('Empty Comment Not Allowed');
      return;
    }
    const new_img_path = './' + img_path;

    axios
      .post('http://localhost:3001/add/comment', {
        comment_body: comment,
        img_path: new_img_path,
        username: global.username,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setComment('');
    window.location.reload(false);
  };
  return (
    <>
      <div>
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
            <br></br>
            <button
              style={{ marginLeft: '20px' }}
              type='submit'
              className='btn btn-primary'
              onClick={() => AddComment()}>
              Post
            </button>
          </div>

          <br></br>
        </div>
      </div>
      {comments.map((comment_object) => (
        <>
          <div className='container'>
            <div
              style={{
                border: '1px solid green',
                height: '70px',
                marginBottom: '15px',
                marginTop: '20px',
              }}>
              <Link to={'/user/' + comment_object.commented_by}>
                {comment_object.commented_by}
              </Link>
              <br />
              <br />
              <div>{comment_object.body}</div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default ShowComments;
