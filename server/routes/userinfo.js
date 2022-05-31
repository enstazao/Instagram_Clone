const express = require('express');
const router = express.Router();
const db = require('../connect');

async function getuserinfo(username) {
  const result = (await db).query(
    'SELECT fullname, email FROM USER WHERE username = ?',
    [username]
  );
  return result;
}

router.post('/', async function (req, res) {
  const username = req.body.username;
  const r = await getuserinfo(username);
  res.json(r);
});

module.exports = router;
