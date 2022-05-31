const express = require('express');
const router = express.Router();
const db = require('../connect');

async function GetPosts(username) {
  const result = (await db).query(
    'SELECT img_path FROM POSTS WHERE username = ? ',
    [username]
  );
  return result;
}
router.post('/', async function (req, res) {
  const username = req.body.username;
  const user_posts = await GetPosts(username);
  return res.json({ images: user_posts[0] });
});

module.exports = router;
