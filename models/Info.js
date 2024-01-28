import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone1: { type: String, required: true },
  phone2: { type: String, required: false },
  telephone: { type: String, required: false },
  webSiteUrl: { type: String, required: false },
  createdAt: { type: Date, default: Date.now() },
});

const Info = new mongoose.model("Info", infoSchema);

export default Info;
