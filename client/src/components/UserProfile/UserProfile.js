import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

const UserProfile = () => {
  const [username, setUsername] = useState(global.username);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');

  function getUserInfo() {
    axios
      .post('http://localhost:3001/userinfo', {
        username: global.username,
      })
      .then((response) => {
        setFullName(response.data[0][0].fullname);
        setEmail(response.data[0][0].email);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getBio() {
    axios
      .post('http://localhost:3001/bio', {
        username: global.username,
      })
      .then((response) => {
        if (response.data.message) {
          setBio('');
        } else {
          setBio(response.data[0][0].bio);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getWebsite() {
    axios
      .post('http://localhost:3001/get/website', {
        username: global.username,
      })
      .then((response) => {
        if (response.data.message) {
          setWebsite('');
        } else {
          setWebsite(response.data[0][0].website);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getPhoneNumber() {
    axios
      .post('http://localhost:3001/phone  ', {
        username: global.username,
      })
      .then((response) => {
        if (response.data.message) {
          setPhoneNumber('');
        } else {
          setPhoneNumber(response.data[0][0].phone_number);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getGender() {
    axios
      .post('http://localhost:3001/get/gender', {
        username: global.username,
      })
      .then((response) => {
        if (response.data.message) {
          setGender('');
        } else {
          setGender(response.data[0][0].gender);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    getUserInfo();
    console.log('Use Effect Runs ...');
  }, []);

  useEffect(() => {
    getBio();
    console.log('Use Effect Bio ...');
  }, []);

  useEffect(() => {
    getWebsite();
    console.log('Use Effect website ...');
  }, []);

  useEffect(() => {
    getPhoneNumber();
    console.log('Use Effect Phone ...');
  }, []);

  useEffect(() => {
    getGender();
    console.log('Use Effect Phone ...');
  }, []);

  const EditProfile = (e) => {
    e.preventDefault();
    // console.log(username, fullname, email, gender, bio, phonenumber, website);
    axios
      .post('http://localhost:3001/editprofile', {
        logged_username: global.username,
        username: username,
        fullname: fullname,
        email: email,
        gender: gender,
        bio: bio,
        phonenumber: phonenumber,
        website: website,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    localStorage.setItem('username', username);
    global.username = username;
  };
  return (
    <div className='container'>
      <div className='container_profile'>
        <Toaster
          position='bottom-center'
          reverseOrder={false}
          toastOptions={{
            className: '',
            style: {
              fontSize: '14px',
            },
          }}
        />
        <div className='profile_panel container'>
          <>
            <form>
              <div className='row ml-minus-15 mr-minus-15'>
                <div className='col-8 p-15'>
                  <div className='create_card'>
                    <h3 className='card_h3'>Edit Profile</h3>
                    <div className='group'>
                      <label htmlFor='name'>Username</label>
                      <input
                        type='text'
                        id='username'
                        className='group__control'
                        placeholder='Enter name'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className='group'>
                      <label htmlFor='fullname'>Full Name</label>
                      <input
                        type='text'
                        id='fullname'
                        className='group__control'
                        placeholder='Enter FullName'
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className='group'>
                      <label htmlFor='email'>Email</label>
                      <input
                        type='text'
                        id='email'
                        className='group__control'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className='group'>
                      <label htmlFor='email'>Bio</label>
                      <input
                        type='text'
                        id='bio'
                        className='group__control'
                        placeholder='Write About Yourself...'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>
                    <div className='group'>
                      <label htmlFor='gender'>Phone Number</label>
                      <input
                        type='text'
                        id='phonenumber'
                        className='group__control'
                        placeholder='Enter Phone Number'
                        value={phonenumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div className='group'>
                      <label htmlFor='location'>Website</label>
                      <input
                        type='text'
                        id='website'
                        className='group__control'
                        placeholder='Enter Website'
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor='gender'>Select Gender</label>
                      <select
                        className='form-control'
                        id='gender'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>

                    {/* <label htmlFor='name'>Upload Profile Picture</label> */}
                    {/* <FileUpload /> */}
                    <br></br>
                    <div className='group'>
                      <button
                        onClick={EditProfile}
                        className='btn btn_status btn-outline-success'
                        type='submit'>
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
