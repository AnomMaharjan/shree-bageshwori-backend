import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    image: [{
        imageUrl: {
            type: String
        },
        publicId: {
            type: String
        }
    }]
})

const Blog = new mongoose.model("Blogs", blogSchema)

export default Blog