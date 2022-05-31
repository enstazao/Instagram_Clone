import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import Message from '../Message/Message';

const Signup = () => {
  let navigate = useNavigate();

  const [emailaddress, setEmailAddress] = useState('');
  const [fullname, setFullName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatpassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');

  // console.log(emailaddress, fullname, username, password, repeatpassword);

  const Signup = () => {
    if (
      emailaddress === '' ||
      username === '' ||
      password === '' ||
      fullname === ''
    ) {
      setMessage('Please Fill All the Fields');
      return;
    } else if (password !== repeatpassword) {
      setMessage('Password Doesnot Match');
      setPassword('');
      setRepeatPassword('');
      return;
    }
    Axios.post('http://localhost:3001/signup', {
      emailaddress: emailaddress,
      fullname: fullname,
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setMessage(response.data.message);
        setEmailAddress('');
        setFullName('');
        setUserName('');
        setPassword('');
        setRepeatPassword('');
      } else {
        navigate('/');
      }
    });
  };

  const onChange = (e) => {
    e.prevent.Default();
  };
  return (
    <Fragment>
      <section className='vh-100 bg-image' style={{ backgroundColor: 'white' }}>
        <div className='mask d-flex align-items-center h-100 gradient-custom-3'>
          <div className='container h-100'>
            <div className='row d-flex justify-content-center align-items-center h-100'>
              <div className='col-12 col-md-9 col-lg-7 col-xl-6'>
                <div className='card' style={{ borderRadius: 15 }}>
                  <div className='card-body p-5'>
                    <h1 className='text-uppercase text-center mb-5'>
                      Instagram
                      <h3>Sign Up</h3>
                    </h1>
                    {message ? <Message msg={message} /> : null}
                    <form onSubmit={onChange}>
                      <div className='form-outline mb-4'>
                        <label className='form-label'>User Name</label>
                        <input
                          type='text'
                          id='username'
                          onChange={(event) => {
                            setUserName(event.target.value);
                          }}
                          className='form-control form-control-lg'
                          value={username}
                        />
                      </div>

                      <div className='form-outline mb-4'>
                        <label className='form-label'>Full Name</label>
                        <input
                          type='text'
                          id='fullname'
                          onChange={(event) => {
                            setFullName(event.target.value);
                          }}
                          className='form-control form-control-lg'
                          value={fullname}
                        />
                      </div>
                      <div className='form-outline mb-4'>
                        <label className='form-label'>Email Address</label>
                        <input
                          type='email'
                          id='emailaddress'
                          onChange={(event) => {
                            setEmailAddress(event.target.value);
                          }}
                          className='form-control form-control-lg'
                          value={emailaddress}
                        />
                      </div>
                      <div className='form-outline mb-4'>
                        <label className='form-label'>Password</label>
                        <input
                          type='password'
                          id='password'
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                          className='form-control form-control-lg'
                          value={password}
                        />
                      </div>
                      <div className='form-outline mb-4'>
                        <label className='form-label'>
                          Repeat your password
                        </label>
                        <input
                          type='password'
                          id='repeatpassword'
                          onChange={(event) => {
                            setRepeatPassword(event.target.value);
                          }}
                          className='form-control form-control-lg'
                          value={repeatpassword}
                        />
                      </div>
                      <div className='d-flex justify-content-center'>
                        <button
                          type='button'
                          className='btn btn-primary btn-block btn-lg gradient-custom-4 text-body'
                          onClick={Signup}>
                          Sign up
                        </button>
                      </div>
                      <p className='mb-0'>
                        Already Have an Account?
                        <Link className='text-black-50 fw-bold' to='/'>
                          {' '}
                          Sign In
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Signup;
