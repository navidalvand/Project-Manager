const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Types.ObjectId, required: [true , "team must have an owner"] },
    name: { type: String, required: [true, "team must have a name"] },
    description: { type: String },
    users: { type: [mongoose.Types.ObjectId], default: [] },
    image : {type : String , default : "default.jpg"}
  },
  {
    timestamps: true,
  }
);

const TeamModel = mongoose.model("team", TeamSchema);

module.exports = { TeamModel };
