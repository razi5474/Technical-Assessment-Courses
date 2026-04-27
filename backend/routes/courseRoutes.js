import express from "express";
import upload from "../middleware/upload.js";
import { getCourseById, uploadCourses } from "../controllers/courseController.js";
import { getCourses } from "../controllers/courseController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadCourses);
router.get("/", getCourses);
router.get("/:id", getCourseById);

export default router;