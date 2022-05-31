const express = require('express');
const router = express.Router();
const db = require('../connect');

async function Get_All_Comments(img_path) {
  const result = (await db).query(
    'SELECT commented_by, body FROM COMMENTS WHERE img_path = ?',
    [img_path]
  );
  return result;
}

router.post('/', async function (req, res) {
  let img_path = req.body.img_path;
  img_path = './' + img_path;
  const get_all = await Get_All_Comments(img_path);
  res.json(get_all);
});

module.exports = router;
