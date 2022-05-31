const express = require('express');
const router = express.Router();
const db = require('../connect');

async function getGender(username) {
  const result = (await db).query(
    'SELECT gender FROM USER_GENDER WHERE username = ? ',
    [username]
  );
  return result;
}
router.post('/', async function (req, res) {
  const username = req.body.username;
  const r = await getGender(username);
  if (r[0].length === 0) {
    res.json({ message: 'gender Not Found' });
  } else {
    res.json(r);
  }
});

module.exports = router;
