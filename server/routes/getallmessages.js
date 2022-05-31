const express = require('express');
const router = express.Router();
const db = require('../connect');

async function GetAllMessages(sender_username, reciever_username) {
  const result = (await db).query(
    'SELECT message_body, sender_username, reciever_username FROM MESSAGES WHERE ((sender_username = ? AND reciever_username = ?) OR (sender_username = ? AND reciever_username = ?))',
    [sender_username, reciever_username, reciever_username, sender_username]
  );
  return result;
}

router.post('/', async function (req, res) {
  const sender_username = req.body.sender_username;
  const reciever_username = req.body.reciever_username;
  const get_all_messages = await GetAllMessages(
    sender_username,
    reciever_username
  );
  res.json(get_all_messages);
});

module.exports = router;
