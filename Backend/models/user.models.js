const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  userData: {
    totalAttendance: { type: Number, default: 0 },
    totalSessions: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 }, // No backend calculation
    attendanceHistory: [{ type: Number }],
    sessionHistory: [{ type: Number }],
    percentageHistory: [{ type: Number }],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
