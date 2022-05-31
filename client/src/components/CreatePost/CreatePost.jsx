import React, { useState } from 'react';
import axios from 'axios';
import Message from '../Message/Message';
import Progress from '../Progress/Progress';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const CreatePost = async () => {
    if (file === '' || caption === '' || location === '') {
      setMessage('Fill ALL Fields');
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', global.username);
    formData.append('caption', caption);
    formData.append('location', location);

    try {
      const res = await axios.post(
        'http://localhost:3001/upload',
        formData,
        { username: global.username },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('Post Created Successfully');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
    setCaption('');
    setLocation('');
    setFilename('');
  };
  return (
    <div className='container'>
      <section className='vh-100' style={{ backgroundColor: '#fff' }}>
        <div className='container py-5 h-100'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
              <div
                className='card shadow-2-strong'
                style={{ borderRadius: '1rem' }}>
                <div className='card-body p-5 text-center'>
                  <h1 className='text-uppercase text-center mb-5'>
                    Create Post
                  </h1>
                  {message ? <Message msg={message} /> : null}
                  <div className='form-outline mb-4'>
                    <input
                      type='caption'
                      id='caption'
                      className='form-control form-control-lg'
                      onChange={(event) => {
                        setCaption(event.target.value);
                      }}
                      value={caption}
                    />
                    <label className='form-label'>Write Caption</label>
                  </div>
                  <br></br>
                  <form>
                    <div className='custom-file mb-4'>
                      <input
                        type='file'
                        className='custom-file-input'
                        id='customFile'
                        onChange={onChange}
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                        {filename}
                      </label>
                    </div>

                    <Progress percentage={uploadPercentage} />
                  </form>
                  <br></br>
                  <div className='form-outline mb-4'>
                    <input
                      type='location'
                      id='location'
                      className='form-control form-control-lg'
                      onChange={(event) => {
                        setLocation(event.target.value);
                      }}
                      value={location}
                    />
                    <label className='form-label'>Location</label>
                  </div>

                  <button
                    className='btn btn-primary btn-lg btn-block'
                    type='submit'
                    onClick={CreatePost}>
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatePost;
