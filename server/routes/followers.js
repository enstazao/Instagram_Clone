const express = require('express');
const router = express.Router();
const db = require('../connect');

async function insert_in_following(following_username, username) {
  const r = (await db).query(
    'INSERT INTO FOLLOWING (following_username, username) VALUES (?, ?)',
    [following_username, username]
  );
  return r;
}

async function insert_in_followers(username, follower_username) {
  const result = (await db).query(
    'INSERT INTO FOLLOWERS (follower_username, username) VALUES (?, ?)',
    [follower_username, username]
  );
  return result;
}
router.post('/', async function (req, res) {
  const username = req.body.username;
  const logeduser = req.body.logedin_username;

  const rone = await insert_in_following(username, logeduser);
  const rtwo = await insert_in_followers(username, logeduser);
  res.json({ msg: 'Data Inserted Successfully' });
});

module.exports = router;
