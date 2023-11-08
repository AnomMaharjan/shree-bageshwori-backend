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
    offers: {
        type: [{ type: String, required: true }],
        // default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Plan = new mongoose.model('Plans', planSchema)

export default Plan