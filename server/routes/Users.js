const express = require('express');
const router = express.Router();
const db = require('../connect');

async function getusername_fullname(logged_in_username) {
  const result = (await db).query(
    'SELECT username, fullname FROM USER WHERE username NOT IN (SELECT following_username FROM USER NATURAL JOIN FOLLOWING WHERE username = ?)',
    [logged_in_username]
  );
  return result;
}

router.post('/', async function (req, res) {
  const logged_in_username = req.body.username;
  const result = await getusername_fullname(logged_in_username);
  return res.json(result);
});

module.exports = router;
