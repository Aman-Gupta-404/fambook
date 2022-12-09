import express from "express";
import { authenticateUser, checkUserLoggedIn } from "../controllers/auth.js";
import { createUser, userLogin, deleteUser, logoutUser } from "../controllers/user.js"
const router = express.Router();

router.post('/create', createUser);
router.post('/signin', userLogin);
// router.post('/delete', userLogin);
// router.post('/signin', userLogin);
router.get('/secret', authenticateUser, (req, res) => {
    res.send("check console")
});
router.delete('/delete/:userId', checkUserLoggedIn, authenticateUser, deleteUser)
router.post('/logout/:userId', checkUserLoggedIn, authenticateUser, logoutUser)

router.get('/test', checkUserLoggedIn, authenticateUser, (req, res) => {
    console.log("got the request")
    res.status(200).json({
        message: "working!"
    })
});

export default router;