import { Router } from "express";
import Testimonial from "../models/Testimonial.js";
import validateTestimonial from "../utils/testimonialValidator.js";
import auth from "../middleware/auth.js";
import { deleteImage, upload, uploadFeedbackPhoto } from "../utils/cloudinaryHelper.js";

const testimonialRouter = Router()

testimonialRouter.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).send({ error: false, testimonials })
    }
    catch (ex) {
        res.status(500).send({ error: true, message: "Internal server error." })
    }
})

testimonialRouter.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const { error } = validateTestimonial(req.body)
        if (error) return res.status(400).send({ status: false, msg: error.details[0].message })

        const buf = Buffer.from(req.file.buffer).toString('base64')
        let dataURI = "data:" + req.file.mimetype + ";base64," + buf
        let cldRes = await uploadFeedbackPhoto(dataURI);

        const testimonial = new Testimonial({
            name: req.body.name,
            review: req.body.review,
            image: { imageUrl: cldRes.secure_url, publicId: cldRes.public_id },
            rating: req.body.rating,
            location: req.body.location
        })

        await testimonial.save()
        return res.status(201).send({ status: true, testimonial })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
})


testimonialRouter.put('/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const { error } = validateTestimonial(req.body)
        if (error) return res.status(400).send({ status: false, msg: error.details[0].message })


        let testimonialImage = await Testimonial.findById(req.params.id);
        if (!testimonialImage) return res.status(404).send({ status: false, msg: 'Testimonial with the given id not found' })

        await deleteImage(testimonialImage.image.publicId);

        const buf = Buffer.from(req.file.buffer).toString('base64')
        let dataURI = "data:" + req.file.mimetype + ";base64," + buf
        let cldRes = await uploadFeedbackPhoto(dataURI);

        let testimonial = await Testimonial.findByIdAndUpdate(req.params.id, {
            ...req.body,
            image: { imageUrl: cldRes.secure_url, publicId: cldRes.public_id }, createdAt: Date.now()
        }, { new: true })


        return res.status(200).send({ status: true, testimonial })
    }
    catch (err) {
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
})


testimonialRouter.delete('/:id', auth, async (req, res) => {
    try {
        let testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return res.status(404).send({ status: false, msg: "Plan with the given id not found." })

        await testimonial.deleteOne()
        return res.status(200).send({ status: true, testimonial })
    }
    catch (err) {
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
})

export default testimonialRouter