const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../connect');

// Checking is the user already exist with username and email
async function is_username_exist(username, emailaddress) {
  const r = (await db).query(
    'SELECT * FROM USER WHERE username = ? OR email = ? ',
    [username, emailaddress]
  );
  return r;
}

// Putting user information into the database
async function create_newuser(username, emailaddress, fullname, hash_password) {
  const r = (await db).query(
    'INSERT INTO USER (username, fullname, email, password) VALUES (?, ?, ?, ?)',
    [username, fullname, emailaddress, hash_password]
  );
  return r;
}

// Getting Data From Signup Form of React
router.post('/', async (req, res) => {
  const emailaddress = req.body.emailaddress;
  const fullname = req.body.fullname;
  const username = req.body.username;
  const password = req.body.password;
  const is_user_exist = await is_username_exist(username, emailaddress);
  let flg = 0;
  if (is_user_exist[0].length === 0) {
    // username and email not already exist
    const hash_password = await bcrypt.hash(password, 10);
    const r = await create_newuser(
      username,
      emailaddress,
      fullname,
      hash_password
    );
    res.send({ success: 'UserCreated Successfully' });
  } else {
    res.send({ message: 'username/emailaddress already exist' });
  }
});

module.exports = router;
