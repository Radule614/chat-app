const _ = require('lodash')
const { uploadPostImages, getPostImageUrl } = require('../helpers/firebase-upload');
const { findPostsForGivenUser, findPostsByIds, findSinglePostById, createPost, updatePostById } = require('../models/post');


const uploadPost = async (req, res) => {
    if(!req.payload) return res.status(403).send({ err: 'Token not valid!'});
    const userid = req.payload._id;
    const content = req.body.content;
    const user = await createPost(userid, content, null);
    if(!user) return res.status(500).send('Something went wrong with saving post!');
    const postId = user._id;
    console.log(postId);
    await uploadPostImages([req.payload.username], [postId]);
    const imageUrl = (await getPostImageUrl(postId))[0];
    console.log(imageUrl);
    const updated = await updatePostById(user._id, userid, { imageUrl });
    if(!updated) return res.status(500).send({ err: 'Something went wrong with saving!'});
    return res.status(200).send({ msg: 'Post saved succesfully!' });
}   

const getAllPostsForUser = async (req, res) => {
    const userid = req.payload._id;
    const posts = await findPostsForGivenUser(userid);
    if(posts == []) return res.status(404).send([]);
    return res.status(200).send({ posts });
}

const getMultiplePosts = async (req, res) => {
    const postIds = req.body.postIds;
    const userid = req.payload._id;
    const posts = await findPostsByIds(postIds, userid);
    if(posts == []) return res.status(404).send([]);
    return res.status(200).send(posts);
}


const getSinglePost = async (req, res) => {
    if(!req.payload) return res.status(403).send({ err: 'Token not provided!'});
    const userid = req.payload._id;
    const _id = req.body._id;
    const post = await findSinglePostById(_id, userid);
    if(!post) return res.status(404).send({});
    return res.status(200).send(post); 
}

const deletePost = async (req, res) => {
    const userid = req.payload._id;
    const _id = req.body._id;
    const deleted = await deletePostById(_id, userid);
    if(!deleted) return res.status(404).send({ err: 'User or post not found!'});
    return res.status(200).send({ msg: 'Post succesfully deleted!'});
}

const updatePost = async (req, res) => {
    const userid = req.payload._id;
    const { _id, update } = req.body;
    const updated = await updatePost(_id, userid, update);
    if(!updated) return res.status(404).send({ err: 'User or post not found!'});
    return res.status(200).send({ msg: 'Sucessfully updated post!'});
}


module.exports = { uploadPost, getAllPostsForUser, getSinglePost, getMultiplePosts, deletePost, updatePost}