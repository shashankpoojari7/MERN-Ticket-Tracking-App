import { Router } from "express";
import { registerUser } from "../Controllers/user.controllers.js";
import { loginUser } from "../Controllers/user.controllers.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

export default router