const express = require('express');
const router = express.Router();
const { uploadPost,  getAllPostsForUser, getSinglePost, deletePost, updatePost} = require('../controllers/postController');
const { checkTokenValidity, checkIfTokenExists } = require('../middleware/webtoken');
const { upload } = require('../middleware/imageUpload');


router.post('/create',[checkIfTokenExists, checkTokenValidity, upload], uploadPost);
router.get('/post',[checkIfTokenExists, checkTokenValidity], getSinglePost);
router.get('/posts', [checkIfTokenExists, checkTokenValidity], getAllPostsForUser);
router.delete('/post', [checkIfTokenExists, checkTokenValidity], deletePost);
router.patch('/edit', [checkIfTokenExists, checkTokenValidity], updatePost);


module.exports = router;