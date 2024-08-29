import express from "express";
import {
  login,
  signup,
  logout,
  forgotPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.post("/forgot-password", verifyEmail);
router.get("/verify-email", verifyEmail);

export default router;
