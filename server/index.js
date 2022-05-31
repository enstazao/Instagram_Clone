const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Need this to make api request from backend
app.use(cors());

app.use(fileUpload());

/**using this express will format the data automatically in json format */
app.use(express.json()); /**Use This Otherwise you get the req.body undefined */

const loginRoute = require('./routes/Login');
const singupRoute = require('./routes/Signup');
const uploadRoute = require('./routes/Upload');
const usersRoute = require('./routes/Users');
const followerRoute = require('./routes/followers');
const postsRoute = require('./routes/Posts');
const likeRoute = require('./routes/like');
const userinfoRoute = require('./routes/userinfo');
const bioRoute = require('./routes/bio');
const websiteRoute = require('./routes/wesbite');
const phoneRoute = require('./routes/phone');
const genderRoute = require('./routes/gender');
const editprofileRoute = require('./routes/editprofile');
const getfollowersRoute = require('./routes/getfollowers');
const getPostRoute = require('./routes/getposts');
const commentRoute = require('./routes/addcomment');
const getComment = require('./routes/getcomments');
const getallComments = require('./routes/getallcomments');
const getfullname = require('./routes/getfullname');
const getallusers = require('./routes/getallusers');
const getallmessages = require('./routes/getallmessages');
const saveMessageRoute = require('./routes/savemessage');
const getfollowingRoute = require('./routes/getfollowing');
const deletefollowing = require('./routes/deletefollowing');

app.use('/posts', postsRoute);
app.use('/upload', uploadRoute);
app.use('/signup', singupRoute);
app.use('/login', loginRoute);
app.use('/users', usersRoute);
app.use('/followers', followerRoute);
app.use('/like/post', likeRoute);
app.use('/userinfo', userinfoRoute);
app.use('/bio', bioRoute);
app.use('/get/website', websiteRoute);
app.use('/phone', phoneRoute);
app.use('/get/gender', genderRoute);
app.use('/editprofile', editprofileRoute);
app.use('/get/user/followers', getfollowersRoute);
app.use('/get/posts', getPostRoute);
app.use('/add/comment', commentRoute);
app.use('/get/comments', getComment);
app.use('/get/comments/all', getallComments);
app.use('/get/fullname', getfullname);
app.use('/get/all/users', getallusers);
app.use('/get/all/messages', getallmessages);
app.use('/save/message', saveMessageRoute);
app.use('/get/user/following', getfollowingRoute);
app.use('/delete/following', deletefollowing);

const port = 3001;

// Starting the server on port 3001
app.listen(port, () => {
  console.log(`SERVER STARTED ${port}`);
});
