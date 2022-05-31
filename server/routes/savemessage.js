const express = require('express');
const router = express.Router();
const db = require('../connect');

async function SaveMessage(sender_username, reciever_username, message_body) {
  const result = (await db).query(
    'INSERT INTO MESSAGES (message_body, sender_username, reciever_username) VALUES (?, ?, ?)',
    [message_body, sender_username, reciever_username]
  );
  return result;
}

router.post('/', async function (req, res) {
  const sender_username = req.body.sender_username;
  const reciever_username = req.body.reciever_username;
  const message_body = req.body.message_body;

  const save_data = await SaveMessage(
    sender_username,
    reciever_username,
    message_body
  );
  res.json({ message: 'Data Added Successfully' });
});
module.exports = router;
