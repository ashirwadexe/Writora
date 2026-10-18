import express from 'express';
import { deleteUserAccount, getProfile, login, logout, register } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route('/logout').get(logout)
router.route("/user-profile").get(isAuthenticated, getProfile)
router.route("/delete-account").delete(isAuthenticated, deleteUserAccount)

export default router;