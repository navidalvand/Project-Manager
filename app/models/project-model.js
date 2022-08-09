const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    title: { type: String, required: true},
    description: { type: String },
    image: { type: String, default: "http://127.0.0.1:3000/default-project.jpg" },
    team: { type: mongoose.Types.ObjectId},
    privateProject : {type : Boolean , default : false},
    tags : {type : [String] , default : []}
  },
  {
    timestamps: true,
  }
);

const ProjectModel = mongoose.model("project", ProjectSchema);

module.exports = { ProjectModel };
