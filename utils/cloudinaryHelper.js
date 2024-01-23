import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { config } from "dotenv";

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadBlogsPhotos = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      // folder: "blogs",
      use_filename: true,
    });
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadBannerPhoto = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder: "banners",
      use_filename: true,
    });
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadFeedbackPhoto = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      // folder: "feedbacks",
      use_filename: true,
    });
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};
