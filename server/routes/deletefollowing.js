const express = require('express');
const router = express.Router();
const db = require('../connect');

async function DelFollowing(unfollowed_user, unfollowed_by) {
  const result = (await db).query(
    'DELETE FROM FOLLOWING WHERE following_username = ? AND username = ?',
    [unfollowed_user, unfollowed_by]
  );
  return result;
}

router.post('/', async function (req, res) {
  const unfollowed_user = req.body.unfollowed_user;
  const unfollowed_by = req.body.unfollowed_by;
  //   console.log(unfollowed_user, unfollowed_by);
  // farhan123 rustam
  const deleteFollowing = await DelFollowing(unfollowed_user, unfollowed_by);
  res.json({ msg: 'Deletion Successful' });
});

module.exports = router;
