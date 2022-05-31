const express = require('express');
const router = express.Router();
const db = require('../connect');

async function GetFollowing(username) {
  const result = (await db).query(
    'SELECT username, fullname FROM USER WHERE username IN (SELECT following_username FROM USER NATURAL JOIN FOLLOWING WHERE username = ?)',
    [username]
  );
  return result;
}

router.post('/', async function (req, res) {
  const username = req.body.username;
  const get_following = await GetFollowing(username);
  res.json(get_following);
});

module.exports = router;
