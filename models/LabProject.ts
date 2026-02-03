import mongoose, { Schema, models } from "mongoose";

const LabProjectSchema = new Schema(
    {
        title: String,
        desc: String,
        tags: [String],
        image: String
    },
    { timestamps: true }
);

export default models.LabProject || mongoose.model("LabProject", LabProjectSchema);
