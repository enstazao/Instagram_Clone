const express = require('express');
const router = express.Router();
const db = require('../connect');
// getposts
async function getposts(username) {
  const result = (await db).query('SELECT * FROM POSTS WHERE username != ?', [
    username,
  ]);
  return result;
}

router.post('/', async function (req, res) {
  const username = req.body.username;
  const response = await getposts(username);
  res.json(response);
});

module.exports = router;
