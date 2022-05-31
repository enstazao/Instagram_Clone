import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import './DoChat.css';

const DoChat = () => {
  const [msg_body, setMsgBody] = useState('');
  const [all_messages, setAllMessages] = useState([{}]);
  const chat_with = useParams();
  //   const reciever_username = chat_with.username;
  //   const sender_username = global.username;

  function GetAllMessages() {
    axios
      .post('http://localhost:3001/get/all/messages', {
        reciever_username: chat_with.username,
        sender_username: global.username,
      })
      .then((response) => {
        setAllMessages(response.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    GetAllMessages();
    console.log('Get All Messages ... ');
  }, []);

  const sendMessage = () => {
    axios
      .post('http://localhost:3001/save/message', {
        message_body: msg_body,
        sender_username: global.username,
        reciever_username: chat_with.username,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    setMsgBody('');
    window.location.reload();
  };

  return (
    <div>
      <div className='container'>
        <h1>{chat_with.username}</h1>
        <div className='chat-window'>
          <div className='chat-header'>
            <p>Live Chat</p>
          </div>
          <div className='chat-body'>
            <ScrollToBottom className='message-container'>
              {all_messages.map((messageContent) => {
                return (
                  <div
                    className='message'
                    id={
                      global.username === messageContent.sender_username
                        ? 'you'
                        : 'other'
                    }>
                    <div>
                      <div className='message-content'>
                        <p>{messageContent.message_body}</p>
                      </div>
                      <div className='message-meta'>
                        <p id='author'>{messageContent.sender_username}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className='chat-footer'>
            <input
              type='text'
              value={msg_body}
              placeholder='Type Your Message'
              onChange={(event) => {
                setMsgBody(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === 'Enter' && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoChat;
