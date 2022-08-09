const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    skills: { type: [String], default: [] },
    team: { type: [String], default: [] },
    role: { type: String, default: "user" },
    token: { type: String, default: "" },
    profile_image: { type: String, default: "http://127.0.0.1:3000/default-user.jpg" },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };

