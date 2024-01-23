import mongoose from "mongoose"

const planSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    subtitle: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Month', 'Year'],  // this is an array of values that
    },
    offers: {
        type: [{ type: String, required: true }],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isPopular: {
        type: Boolean,
        default: false
    }
})

const Plan = new mongoose.model('Plans', planSchema)

export default Plan