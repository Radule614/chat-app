const path = require('path'); 
const multer = require('multer'); 
const { createVerify } = require('crypto');

let storage = multer.diskStorage({ 
    destination: path.join(__dirname, '../public/uploads/imgs/'),
    filename: function (req, file, cb) {
      cb(null, (req.body.username || req.payload.username) + '.png');
    }
});

let postStorage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/posts'),
    filename: function (req, file, cb) {
      console.log(path.join(__dirname, '../public/uploads/posts'));
      cb(null, (req.payload.username) + '.png');
    }
});
let upload = multer({ storage }).single('image');
let uploadPostImage = multer({ storage }).single('image');

module.exports = { upload, uploadPostImage };