import fs from "fs";
import csv from "csv-parser";
import Course from "../models/Course.js";
import { client } from "../config/redis.js";

export const uploadCourses = async (req, res) => {
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
          results.push({
            course_id: data["Unique ID"],
            title: data["Course Name"],
            description: data["Overview/Description"],
            category: data["Discipline/Major"],
            instructor: data["Professor Name"],
            duration: data["Duration (Months)"],
          });
        })
      .on("end", async () => {
        await Course.insertMany(results);
        // 🔥 Clear cache
        await client.flushAll();

        console.log("Cache cleared 🧹");
        res.json({ message: "Courses uploaded successfully" });
      });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const search = req.query.search || "";
    const cacheKey = `courses:${search}`;

    // 1️⃣ Check Redis cache
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      console.log("Serving from Redis 🧠");
      return res.json(JSON.parse(cachedData));
    }

    // 2️⃣ If not in cache → fetch from MongoDB

    const courses = await Course.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    });

    // 3️⃣ Store in Redis (expire in 1 hour)
    await client.setEx(cacheKey, 3600, JSON.stringify(courses));

    console.log("Serving from MongoDB 🗄️");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};