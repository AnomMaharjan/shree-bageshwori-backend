import { Router } from "express";
import auth from "../middleware/auth.js";
import validateBlog from "../utils/blogsValidator.js";
import Blog from "../models/Blog.js";

const blogsRouter = Router()


blogsRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort('createdAt')
        res.status(200).send({ error: false, blogs })
    }
    catch (ex) {
        res.status(500).send({ error: true, message: "Internal server error." })
    }
})


blogsRouter.post('/', auth, async (req, res) => {
    try {
        const { error } = validateBlog(req.body)
        if (error) return res.status(400).send({ error: true, message: error.details[0].message })

        const post = new Blog({ ...req.body })
        await post.save()

        return res.status(201).send({ error: false, post })

    } catch (ex) {
        return res.status(500).send({ error: true, message: "Internal server error." })
    }
})


blogsRouter.put('/:id', auth, async (req, res) => {
    try {

        const blog = await Blog.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        if (!blog) return res.status(404).send({ error: true, message: "Blog with the given ID not found." })

        const { error } = validateBlog(req.body)
        if (error) return res.status(400).send({ error: true, message: error.details[0].message })

        return res.status(201).send({ error: false, blog })

    } catch (ex) {
        return res.status(500).send({ error: true, message: "Internal server error." })
    }
})


blogsRouter.delete('/:id', auth, async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send({ status: false, msg: "Blog with the given id not found." })

        await blog.deleteOne()
        return res.status(200).send({ status: true, blog })
    }
    catch (err) {
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
})

export default blogsRouter
