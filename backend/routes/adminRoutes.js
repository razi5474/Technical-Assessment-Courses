import express from "express";
import { signupAdmin, loginAdmin } from "../controllers/adminController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;