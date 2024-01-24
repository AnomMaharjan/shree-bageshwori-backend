import { Router } from "express";
import auth from "../middleware/auth.js";
import validateBlog from "../utils/blogsValidator.js";
import Blog from "../models/Blog.js";
import { deleteImage, upload, uploadBlogsPhotos } from "../utils/cloudinaryHelper.js";

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
                imageURLs.push({ imageUrl: cldRes.secure_url, publicId: cldRes.public_id })
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


blogsRouter.put('/:id', auth, upload.array('image'), async (req, res) => {
    try {
        const { error } = validateBlog(req.body)
        if (error) return res.status(400).send({ error: true, message: error.details[0].message })

        const blogImages = await Blog.findById(req.params.id);
        if (!blogImages) return res.status(404).send({ error: true, message: "Blog with the given ID not found." })

        if (blogImages.image.length !== 0) {
            for (var i = 0; i < blogImages.image.length; i++) {
                await deleteImage(blogImages.image[i].publicId);
            }
        }

        var imageURLs = []
        if (req.files.length !== 0) {
            for (var i = 0; i < req.files.length; i++) {
                const buf = Buffer.from(req.files[i].buffer).toString('base64')
                let dataURI = "data:" + req.files[i].mimetype + ";base64," + buf
                let cldRes = await uploadBlogsPhotos(dataURI);
                imageURLs.push({ imageUrl: cldRes.secure_url, publicId: cldRes.public_id })
            }
        }


        const blog = await Blog.findByIdAndUpdate(req.params.id, { ...req.body, image: imageURLs, createdAt: Date.now() }, { new: true })

        return res.status(201).send({ error: false, blog })

    } catch (ex) {
        return res.status(500).send({ error: true, message: "Internal server error." })
    }
})


blogsRouter.delete('/:id', auth, async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send({ status: false, msg: "Blog with the given id not found." })


        if (blog.image.length !== 0) {
            for (var i = 0; i < blog.image.length; i++) {
                await deleteImage(blog.image[i].publicId);
            }
        }

        await blog.deleteOne()
        return res.status(200).send({ status: true, blog })
    }
    catch (err) {
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
})

export default blogsRouter
