const express = require('express');
const router = express.Router();
const db = require('../connect');

async function is_insert(liked_by, img_path) {
  const result = (await db).query(
    'SELECT liked_by FROM LIKES WHERE liked_by = ? AND img_path = ?',
    [liked_by, img_path]
  );
  return result;
}

async function insert_data(liked_by, img_path) {
  const result = (await db).query(
    'INSERT INTO LIKES (liked_by, img_path) VALUES (?, ?)',
    [liked_by, img_path]
  );
  return result;
}

async function delete_like(liked_by, img_path) {
  const result = (await db).query(
    'DELETE FROM LIKES WHERE liked_by = ? AND img_path = ?',
    [liked_by, img_path]
  );
  return result;
}
// Updating Likes
async function update_post_likes(img_path) {
  const result = (await db).query(
    'UPDATE POSTS SET likes = likes + 1 WHERE img_path = ? ',
    [img_path]
  );
  return result;
}

async function delete_like(img_path, liked_by) {
  const result = (await db).query(
    'DELETE FROM LIKES WHERE liked_by = ? AND img_path = ?',
    [liked_by, img_path]
  );
  return result;
}

async function delete_post_like(img_path) {
  const result = (await db).query(
    'UPDATE POSTS SET likes = likes - 1 WHERE img_path = ? AND likes > 0',
    [img_path]
  );
  return result;
}
router.post('/', async function (req, res) {
  const liked_by = req.body.liked_by;
  const img_path = req.body.img_path;
  const r = await is_insert(liked_by, img_path);
  if (r[0].length === 0) {
    const a = await insert_data(liked_by, img_path);
    const u = await update_post_likes(img_path);
    res.json({ isLiked: true });
  } else {
    const d = delete_like(img_path, liked_by);
    const b = await delete_post_like(img_path);
    res.json({ isLiked: false });
  }
});

module.exports = router;
