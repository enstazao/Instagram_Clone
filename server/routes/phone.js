const express = require('express');
const router = express.Router();
const db = require('../connect');

async function getPhoneNumber(username) {
  const result = (await db).query(
    'SELECT phone_number FROM USER_PHONE WHERE username = ? ',
    [username]
  );
  return result;
}

router.post('/', async function (req, res) {
  const username = req.body.username;
  const r = await getPhoneNumber(username);
  if (r[0].length === 0) {
    res.json({ message: 'Phone Number Not Found' });
  } else {
    res.json(r);
  }
});

module.exports = router;
