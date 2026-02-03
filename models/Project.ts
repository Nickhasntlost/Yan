import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: String,
    category: String,
    image: String,
    desc: String,
    stats: Object
  },
  { timestamps: true }
);

export default models.Project || mongoose.model("Project", ProjectSchema);
