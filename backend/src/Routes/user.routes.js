import { Router } from "express";
import { registerUser,
        loginUser,
        changeCurrentPassword,
        refreshAccessToken,
        logoutUser
        } from "../Controllers/user.controllers.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/refresh-token").post(refreshAccessToken)
router.post("/logout", verifyJWT, logoutUser);
router.get("/me", verifyJWT, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user, 
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
});

export default router