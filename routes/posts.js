import express from "express";
import { authenticateUser, checkUserLoggedIn } from "../controllers/auth.js";
import { getPosts, getMyPosts, createPosts, likePost, deletePost } from "../controllers/posts.js"
import multer from "multer";
import path from "path"

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({storage: storage})

router.get('/get', getPosts);
router.get('/mypost/:userId',checkUserLoggedIn, authenticateUser, getMyPosts);
router.post('/create/:userId',checkUserLoggedIn, authenticateUser, upload.single('selectedFile'), createPosts);
router.put('/like/:userId/:postId',checkUserLoggedIn, authenticateUser, likePost);
router.delete('/delete/:postId',checkUserLoggedIn, authenticateUser, deletePost);

export default router;