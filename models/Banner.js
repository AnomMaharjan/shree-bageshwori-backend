import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: false },
  description: { type: String, required: false, default: "" },
  isLinkAttached: { type: Boolean, default: false },
  linkUrl: { type: String, default: "" },
  subTitleHighlights: { type: [String], required: false },
  titleHighlights: { type: [String], required: false },

  image: {
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
    },
  },
  createdAt: { type: Date, default: Date.now() },
});

const Banner = new mongoose.model("Banners", bannerSchema);

export default Banner;
