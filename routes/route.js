import express from 'express'
import { signupUser, loginUser, emailSend, changePassword } from '../controller/user-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import  upload  from '../middleware/upload.js';
import { createPost, getAllPosts, getPost, updatePost, deletePost, addLike, removeLike, getUserPosts } from '../controller/post-controller.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { addComment, getComment, deleteComment } from '../controller/comment-controller.js';

const router = express.Router();

//signup useer
router.post('/signup', signupUser);

//login user
router.post('/login', loginUser);

//image file uploading
router.post('/file/upload', upload.single('file'), uploadImage);

//getting image from db
router.get('/file/:filename', getImage)

// create post api
router.post('/create', authenticateToken , createPost);

//fetch all posts
router.get('/posts', getAllPosts);

//fetch user all posts
router.get('/posts/:id', getUserPosts);

//fetch post by id
router.get('/post/:id', getPost);

//update post by id
router.put('/update/:id', authenticateToken, updatePost);

//update post by id
router.delete('/delete/post/:id', authenticateToken, deletePost);

//Add Comment
router.post('/comment', authenticateToken, addComment);

//Get Comment
router.get('/post/comments/:id', getComment);

//Delete Comment
router.put('/delete/comments', authenticateToken, deleteComment);

//Add Like
router.put('/like', authenticateToken, addLike);

//Add Like
router.put('/dislike', authenticateToken, removeLike);

//sending email for otp
router.post('/email-send', authenticateToken, emailSend);

// changing password
router.post('/change-password', authenticateToken, changePassword);

export default router;