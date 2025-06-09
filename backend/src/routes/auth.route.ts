//auth.route.ts
import express, { Router } from "express";  
import { checkAuth, login, logout, signup, updateProfile, } from "../controllers/auth.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router: Router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;