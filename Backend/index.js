const express = require("express");
const cors = require("cors");
const User = require("./models/user.models");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};
connectDB();

// Route: Create or Update User Data
app.post("/api/v1/user-info", async (req, res) => {
  const { userName, totalSession, totalAttendence, percentage } = req.body;

  try {
    if (
      !userName ||
      totalSession == null ||
      totalAttendence == null ||
      percentage == null
    ) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    let user = await User.findOne({ userName });

    if (!user) {
      // Create a new user with initial data
      user = await User.create({
        userName,
        userData: {
          totalAttendance: totalAttendence,
          totalSessions: totalSession,
          percentage: percentage,
          attendanceHistory: [],
          sessionHistory: [],
          percentageHistory: [],
        },
      });
    } else {
      // Store the previous values before updating
      user.userData.attendanceHistory.push(user.userData.totalAttendance);
      user.userData.sessionHistory.push(user.userData.totalSessions);
      user.userData.percentageHistory.push(user.userData.percentage);

      // Update with new values (without adding to previous ones)
      user.userData.totalAttendance = totalAttendence;
      user.userData.totalSessions = totalSession;
      user.userData.percentage = percentage; // Directly store the frontend value

      await user.save();
    }

    res.status(200).json({
      message: "User data updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Route: Get User Logs
app.get("/api/v1/show-logs/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const userData = await User.findById(user_id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
