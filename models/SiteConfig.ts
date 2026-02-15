import mongoose, { Schema, models } from "mongoose";

const HeroSchema = new Schema({
  tag: { type: String, default: "" },
  title: { type: String, default: "" },
  subTitle: { type: String, default: "" },
  description: { type: String, default: "" },
  scrollText: { type: String, default: "" },
});

const SiteConfigSchema = new Schema(
  {
    home: {
      hero: {
        tag: { type: String, default: "" },
        title: { type: String, default: "" },
        subTitle: { type: String, default: "" },
        description: { type: String, default: "" },
        scrollText: { type: String, default: "" }
      },
      sponsors: { type: [String], default: [] },
      events: [{
        title: String,
        date: String,
        type: { type: String }
      }],
      testimonials: [{
        quote: String,
        name: String,
        role: String
      }]
    },
    about: {
      hero: {
        tag: { type: String, default: "" },
        title: { type: String, default: "" },
        subTitle: { type: String, default: "" },
        description: { type: String, default: "" },
        scrollText: { type: String, default: "" }
      },
      mission: {
        title: { type: String, default: "" },
        content: { type: String, default: "" }
      },
      history: [{
        year: String,
        title: String,
        desc: String,
        image: String
      }],
      stats: [{
        label: String,
        value: Number,
        suffix: String
      }],
      faculty: {
        name: String,
        quote: String,
        description: String,
        image: String
      }
    },
    contact: {
      hero: {
        tag: { type: String, default: "" },
        title: { type: String, default: "" },
        subTitle: { type: String, default: "" },
        description: { type: String, default: "" },
        scrollText: { type: String, default: "" }
      },
      info: {
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        address: { type: String, default: "" }
      }
    },
    projects: {
      hero: {
        tag: { type: String, default: "" },
        title: { type: String, default: "" },
        subTitle: { type: String, default: "" },
        description: { type: String, default: "" },
        scrollText: { type: String, default: "" }
      }
    },
    team: {
      hero: {
        tag: { type: String, default: "" },
        title: { type: String, default: "" },
        subTitle: { type: String, default: "" },
        description: { type: String, default: "" },
        scrollText: { type: String, default: "" }
      }
    }
  },
  { timestamps: true }
);

export default models.SiteConfig || mongoose.model("SiteConfig", SiteConfigSchema);
