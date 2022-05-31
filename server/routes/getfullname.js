const express = require('express');
const router = express.Router();
const db = require('../connect');

async function GetFullName(username) {
  const result = (await db).query(
    'SELECT fullname FROM USER WHERE username = ?',
    [username]
  );
  return result;
}
router.post('/', async function (req, res) {
  const username = req.body.username;
  const get_name = await GetFullName(username);
  res.json({ fullname: get_name[0][0].fullname });
});

module.exports = router;
