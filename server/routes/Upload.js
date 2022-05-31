const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const db = require('../connect');

async function insert_postinfo(filepath, username, caption, location) {
  const r = (await db).query(
    'INSERT INTO POSTS (likes, username, img_path, location, caption) VALUES (?, ?, ?, ?, ?)',
    [0, username, filepath, location, caption]
  );
  return r;
}

// Upload Endpoint
router.post('/', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const username = req.body.username;
  const caption = req.body.caption;
  const location = req.body.location;

  const file = req.files.file;
  const user_dir = `${__dirname}/../../client/public/uploads/${username}`;
  // If user directory does not exist then create a directory
  if (!fs.existsSync(user_dir)) {
    fs.mkdirSync(user_dir);
  }
  // Making Image name unique
  const fileExt = path.extname(file.name);
  const fileName = path.parse(file.name).name;
  file.name = fileName + '-' + uuidv4() + fileExt;

  const img_dir = `${__dirname}/../../client/public/uploads/${username}/${file.name}`;
  const filePath = `./uploads/${username}/${file.name}`;
  file.mv(img_dir, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({
      fileName: file.name,
      filePath: filePath,
    });
  });
  // console.log(username);
  const r = await insert_postinfo(filePath, username, caption, location);
});

module.exports = router;
