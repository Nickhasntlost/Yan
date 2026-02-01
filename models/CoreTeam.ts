import mongoose from "mongoose";

const CoreTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  roleOrder: { type: Number, required: true },
  department: String,
  image: String, // Cloudinary URL
  bio: String,
  socials: {
    linkedin: String,
    github: String,
    mail: String,
  },
  stats: {
    exp: String,
    projects: String,
    awards: String,
  },
});

export default mongoose.models.CoreTeam || mongoose.model("CoreTeam", CoreTeamSchema);
