import express from 'express';
import { createUser ,loginUser,getUser,updatePassword,logout,getUsers, deleteUser, updateUser} from '../controller/userController.js';
import { roleBaseAuth,verifyUserAuth } from '../utlil/UserAuth.js';

const router = express.Router();

router.post('/register',createUser)
router.post('/login',loginUser)
router.get('/getuser',verifyUserAuth,getUser)
router.post('/updatepassword',verifyUserAuth,updatePassword)
router.get('/logout',verifyUserAuth,logout)
router.get('/get-user',verifyUserAuth,getUsers)
router.put('/delete-user/:id',verifyUserAuth,deleteUser)
router.put('/update-user/:id',verifyUserAuth,updateUser)
router.get('/get-user/:id',verifyUserAuth,getUser)
router.put('/update-password',verifyUserAuth,updatePassword)

export default router;
