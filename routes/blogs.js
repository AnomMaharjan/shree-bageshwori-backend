import { Router } from "express";
import auth from "../middleware/auth.js";
import validateBlog from "../utils/blogsValidator.js";
import Blog from "../models/Blog.js";
import { upload, uploadBlogsPhotos } from "../utils/cloudinaryHelper.js";

const blogsRouter = Router()


blogsRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort('-createdAt')
        res.status(200).send({ error: false, blogs })
    }
    catch (ex) {
        res.status(500).send({ error: true, message: "Internal server error." })
    }
})


blogsRouter.post('/', auth, upload.array('image'), async (req, res) => {
    try {
        const { error } = validateBlog(req.body)
        if (error) return res.status(400).send({ error: true, message: error.details[0].message })

        var imageURLs = []
        if (req.files.length !== 0) {
            for (var i = 0; i < req.files.length; i++) {
                const buf = Buffer.from(req.files[i].buffer).toString('base64')
                let dataURI = "data:" + req.files[i].mimetype + ";base64," + buf
                let cldRes = await uploadBlogsPhotos(dataURI);
                imageURLs.push(cldRes.secure_url)
            }
        }

        const blog = new Blog({ ...req.body, image: imageURLs })
        await blog.save()

        return res.status(201).send({ error: false, blog })

    } catch (ex) {
        console.log(ex)
        return res.status(500).send({ error: true, message: "Internal server error." })
    }
})


blogsRouter.put('/:id', auth, async (req, res) => {
    try {

        const blog = await Blog.findByIdAndUpdate(req.params.id, { ...req.body, createdAt: Date.now() }, { new: true })
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
