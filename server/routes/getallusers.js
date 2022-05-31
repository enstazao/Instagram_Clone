const express = require('express');
const router = express.Router();
const db = require('../connect');

async function GetAllUsers(username) {
  const result = (await db).query('SELECT * FROM USER WHERE username != ? ', [
    username,
  ]);
  return result;
}

router.post('/', async function (req, res) {
  const username = req.body.username;
  const get_users = await GetAllUsers(username);
  res.json(get_users);
});

module.exports = router;
