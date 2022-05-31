const express = require('express');
const router = express.Router();

const db = require('../connect');

async function Insert_Comment_In_Db(comment_body, img_path, username) {
  const result = (await db).query(
    'INSERT INTO COMMENTS (commented_by, img_path, body) VALUES (?, ?, ?)',
    [username, img_path, comment_body]
  );
  return result;
}

router.post('/', async function (req, res) {
  const comment_body = req.body;
  const img_path = req.body.img_path;
  const username = req.body.username;
  const r = await Insert_Comment_In_Db(
    comment_body.comment_body,
    img_path,
    username
  );
  console.log(r);
});

module.exports = router;
