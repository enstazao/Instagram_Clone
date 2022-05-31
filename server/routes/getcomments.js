const express = require('express');
const router = express.Router();
const db = require('../connect');

async function Get_Comment(username) {
  const result = (await db).query(
    'SELECT commented_at, commented_by, img_path, body FROM COMMENTS WHERE commented_by != ?  LIMIT 2',
    [username]
  );
  return result;
}

router.post('/', async function (req, res) {
  const username = req.body.username;
  const get_comment = await Get_Comment(username);
  if (get_comment[0].length === 0) {
    res.json({ message: 'No Comment Found' });
  } else {
    res.json(get_comment);
  }
});

module.exports = router;
