const express = require('express');
const router = express.Router();
const db = require('../connect');

async function CountFollowers(username) {
  const result = (await db).query(
    'SELECT COUNT(*) AS followers FROM FOLLOWERS WHERE username = ? ',
    [username]
  );
  return result;
}

async function CountFollowing(username) {
  const result = (await db).query(
    'SELECT COUNT(*) AS following FROM FOLLOWING WHERE username = ?',
    [username]
  );
  return result;
}

router.post('/', async function (req, res) {
  const username = req.body.username;
  const countfollowers = await CountFollowers(username);
  const countfollowing = await CountFollowing(username);
  return res.json({
    followers: countfollowers[0][0].followers,
    following: countfollowing[0][0].following,
  });
});

module.exports = router;
