import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});

const Banner = new mongoose.model('Banners', bannerSchema)

export default Banner