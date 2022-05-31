const express = require('express');
const router = express.Router();
const db = require('../connect');

async function check_username(username, email) {
  const result = (await db).query(
    'SELECT * FROM USER WHERE username = ? OR email = ?',
    [username, email]
  );
  return result;
}

async function insert_data(logged_username, username, email, fullname) {
  const result = (await db).query(
    'UPDATE USER SET username = ?, email = ?, fullname = ? WHERE username = ?',
    [username, email, fullname, logged_username]
  );
  return result;
}

async function Check_Gender(username) {
  const result = (await db).query(
    'SELECT username, gender FROM USER_GENDER WHERE username = ?',
    [username]
  );
  return result;
}

async function Insert_Gender(username, gender) {
  const result = (await db).query(
    'INSERT INTO USER_GENDER (username, gender) VALUES (?,?)',
    [username, gender]
  );
  return result;
}

async function Update_Gender(username, gender) {
  const result = (await db).query(
    'UPDATE USER_GENDER SET gender = ? WHERE username = ?',
    [gender, username]
  );
  return result;
}

async function Check_Bio(username) {
  const result = (await db).query('SELECT * FROM USER_BIO WHERE username = ?', [
    username,
  ]);
  return result;
}

async function Insert_Bio(username, bio) {
  const result = (await db).query(
    'INSERT INTO USER_BIO (username, bio) VALUES (?, ?)',
    [username, bio]
  );
  return result;
}

async function Update_Bio(username, bio) {
  const result = (await db).query(
    'UPDATE USER_BIO SET bio = ? WHERE username = ? ',
    [bio, username]
  );
  return result;
}

async function Delete_Bio(username, bio) {
  const result = (await db).query('DELETE FROM USER_BIO WHERE username = ?', [
    username,
  ]);
  return result;
}
async function Check_Phone(username) {
  const result = (await db).query(
    'SELECT * FROM  USER_PHONE WHERE username = ?',
    [username]
  );
  return result;
}

async function Insert_Phone(username, phonenumber) {
  const result = (await db).query(
    'INSERT INTO USER_PHONE (username, phone_number) VALUES (?,?)',
    [username, phonenumber]
  );
  return result;
}

async function Update_Phone(username, phonenumber) {
  const result = (await db).query(
    'UPDATE USER_PHONE SET phone_number = ? WHERE username = ? ',
    [phonenumber, username]
  );
  return result;
}

async function Delete_Phone(username, phonenumber) {
  const result = (await db).query(
    'DELETE FROM USER_PHONE WHERE username = ? ',
    [username]
  );
  return result;
}

async function Check_Website(username) {
  const result = (await db).query(
    'SELECT * FROM USER_WEBSITE WHERE username = ? ',
    [username]
  );
  return result;
}

async function Insert_Website(username, website) {
  const result = (await db).query(
    'INSERT INTO USER_WEBSITE (username, website) VALUES (?, ?)',
    [username, website]
  );
  return result;
}

async function Update_Website(username, website) {
  const result = (await db).query(
    'UPDATE USER_WEBSITE SET website = ? WHERE username = ?',
    [website, username]
  );
  return result;
}

async function Delete_Website(username, website) {
  const result = (await db).query(
    'DELETE FROM USER_WEBSITE WHERE username = ?',
    [username]
  );
  return result;
}
router.post('/', async function (req, res) {
  const logged_username = req.body.logged_username;
  const username = req.body.username;
  const email = req.body.email;
  const fullname = req.body.fullname;
  const gender = req.body.gender;
  const bio = req.body.bio;
  const phonenumber = req.body.phonenumber;
  const website = req.body.website;
  //   console.log(username, fullname, email, gender, bio, phonenumber, website);
  //   Check is given username available
  const r = await check_username(username, email);
  if (r[0].length !== 0) {
    res.json({ message: 'username/email already exist' });
  } else {
    const insert = await insert_data(
      logged_username,
      username,
      email,
      fullname
    );
  }

  //   Updating Gender
  if (gender !== '') {
    const check_gender = await Check_Gender(username);
    if (check_gender[0].length === 0) {
      const insert_gender = await Insert_Gender(username, gender);
    } else {
      const update_gender = await Update_Gender(username, gender);
    }
  }

  //   Updating Bio
  if (bio !== '') {
    const check_bio = await Check_Bio(username);
    if (check_bio[0].length === 0) {
      const insert_bio = await Insert_Bio(username, bio);
    } else {
      const update_bio = await Update_Bio(username, bio);
    }
  } else {
    const check_bio_del = await Check_Bio(username);
    if (check_bio_del[0].length !== 0) {
      const del_bio = await Delete_Bio(username, bio);
    }
  }

  // Updating Phone NUmber
  if (phonenumber !== '') {
    const check_phone = await Check_Phone(username);
    if (check_phone[0].length === 0) {
      const insert_phone = await Insert_Phone(username, phonenumber);
    } else {
      const update_phone = await Update_Phone(username, phonenumber);
    }
  } else {
    const check_phonenumber_del = await Check_Phone(username);
    if (check_phonenumber_del[0].length !== 0) {
      const delete_phone = await Delete_Phone(username, phonenumber);
    }
  }

  if (website !== '') {
    const check_website = await Check_Website(username);
    if (check_website[0].length === 0) {
      const insert_website = await Insert_Website(username, website);
    } else {
      const update_website = await Update_Website(username, website);
    }
  } else {
    const check_website_del = await Check_Website(username);
    if (check_website_del[0].length !== 0) {
      const delete_website = await Delete_Website(username, website);
    }
  }
});

module.exports = router;
