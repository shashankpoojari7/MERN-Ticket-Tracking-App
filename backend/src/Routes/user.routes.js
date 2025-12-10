import { Router } from "express";
import { registerUser,
        loginUser,
        changeCurrentPassword,
        refreshAccessToken
        } from "../Controllers/user.controllers.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/refresh-token").post(refreshAccessToken)

export default router