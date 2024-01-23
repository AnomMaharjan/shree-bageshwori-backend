import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    image: {
        imageUrl: {
            type: String,
            required: true
        },
        publicId: {
            type: String
        }
    }
})

const Testimonial = new mongoose.model('Testimonials', testimonialSchema)

export default Testimonial