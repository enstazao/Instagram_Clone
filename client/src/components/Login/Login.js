import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../auth';
import Message from '../Message/Message';

const Login = (props) => {
  const auth = useAuth();
  let navigate = useNavigate();
  const [username_email, setUsername_Email] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // This Function called on the form submition
  const login = () => {
    if (username_email === '' || password === '') {
      setMessage('Please Enter All the Fields To Login');
      return;
    }
    Axios.post('http://localhost:3001/login', {
      username_email: username_email,
      password: password,
    }).then((response) => {
      // response is coming from backend it correct username then backend response is printed other wise the err will be going to print
      // if correct response then you will recieve that user data
      if (response.data.message) {
        setUsername_Email('');
        setPassword('');
        setMessage(response.data.message);
      } else {
        localStorage.setItem('username', username_email);
        global.username = localStorage.getItem('username');
        auth.login(localStorage.getItem('username'));
        navigate('/home');
      }
    });
  };
  // Rendering the Login Form
  return (
    <>
      {global.username === '' ? (
        <div>
          <section className='vh-100' style={{ backgroundColor: '#fff' }}>
            <div className='container py-5 h-100'>
              <div className='row d-flex justify-content-center align-items-center h-100'>
                <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                  <div
                    className='card shadow-2-strong'
                    style={{ borderRadius: '1rem' }}>
                    <div className='card-body p-5 text-center'>
                      <h1 className='text-uppercase text-center mb-5'>
                        Instagram
                      </h1>
                      <h3>Log In</h3>
                      {message ? <Message msg={message} /> : null}
                      <div className='form-outline mb-4'>
                        <label className='form-label'>UserName</label>
                        <input
                          type='email'
                          id='email'
                          className='form-control form-control-lg'
                          onChange={(event) => {
                            setUsername_Email(event.target.value);
                          }}
                          value={username_email}
                        />
                      </div>
                      <div className='form-outline mb-4'>
                        <label className='form-label'>Password</label>
                        <input
                          type='password'
                          id='password'
                          className='form-control form-control-lg'
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                          value={password}
                        />
                      </div>

                      <button
                        className='btn btn-primary btn-lg btn-block'
                        type='submit'
                        onClick={login}>
                        Login
                      </button>
                      <p className='mb-0'>
                        Donot Have An Account?
                        <Link
                          className='text-black-50 fw-bold'
                          to='/accounts/signup'>
                          {' '}
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default Login;
