const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../connect');

// Getting the HashPassword From the Database
async function get_hash_password(username) {
  const hash_password = (await db).query(
    'SELECT password FROM USER WHERE username = ? ',
    [username]
  );
  return hash_password;
}

async function check_username_exist(username) {
  const result = (await db).query('SELECT * FROM USER WHERE username = ? ', [
    username,
  ]);
  return result;
}

// React is rendering the data entered by user on the login page at this route and in the backend we are handling this
router.post('/', async function (req, res) {
  const username_email = req.body.username_email;
  const password = req.body.password;
  let flg = 0;

  // CHECKING IF USER NAME EXIST ORNOT
  const usr_exist = await check_username_exist(username_email);
  if (usr_exist[0].length === 0) {
    res.send({ message: 'username doesnot exist!' });
    flg = 1;
  }

  if (flg == 0) {
    // GETTING THE HASH PASSWORD
    let hash_password = await get_hash_password(username_email);
    hash_password = hash_password[0][0].password;
    const password_match = await bcrypt.compare(password, hash_password);
    if (password_match) {
      res.send({ success: 'username and password found' });
    } else {
      res.send({ message: 'Wrong Password!!' });
    }
  }
});

module.exports = router;
