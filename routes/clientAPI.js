import { Router } from "express";
import Banner from "../models/Banner.js";
import Blog from "../models/Blog.js";
import Testimonial from "../models/Testimonial.js";
import Plan from "../models/Plan.js";

const clientAPIRouter = Router();

clientAPIRouter.get('/', async (req, res) => {
    try {
        const banners = await Banner.find();
        const blogs = await Blog.find();
        const testimonials = await Testimonial.find();
        const plans = await Plan.find();

        if (!banners || !blogs || !testimonials || !plans) {
            return res.status(400).send({ 'error': true, 'msg': "Something went wrong." })
        }

        return res.status(200).send({ banners, blogs, testimonials, plans })
    } catch (ex) {
        return res.status(500).send({ error: true, msg: 'Internal Server Error!' })
    }
}
);

export default clientAPIRouter