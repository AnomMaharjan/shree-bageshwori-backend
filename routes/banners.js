import { Router } from "express";
import Banner from "../models/Banner.js";
import { bannerValidate } from '../utils/bannerValidator.js'
const bannerRoutes = Router()

//Get all banners
bannerRoutes.get('/', async (req, res) => {
    try {
        const banners = await Banner.find()

        return res.status(200).send({ error: false, banners })
    } catch (err) {
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }

})

//Get banner by id
bannerRoutes.get("/:id", async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id)
        if (!banner) return res.status(400).send({ error: true, msg: 'Banner with the given id not found.' })

        return res.status(200).send({ error: false, banner })
    }
    catch (err) {
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
})

//Create banner
bannerRoutes.post('/', async (req, res) => {
    try {
        const { error } = bannerValidate(req.body)
        if (error) return res.status(400).send({ error: true, msg: error.details[0].message })

        const banner = new Banner({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        })

        await banner.save()
        return res.status(201).send({ error: false, banner })
    }
    catch (err) {
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
})

//Update banner
bannerRoutes.put('/:id', async (req, res) => {
    try {
        const { error } = bannerValidate(req.body)
        if (error) return res.status(400).send({ error: true, msg: error.details[0].message })


        const banner = await Banner.findByIdAndUpdate(req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                createdAt: Date.now()
            },
            { new: true }
        )
        if (!banner) return res.status(400).send({ error: true, msg: 'Banner with the given id not found.' })


        return res.status(200).send({ error: false, banner })
    }
    catch (err) {
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
})

//Delete Banner
bannerRoutes.delete('/:id', async (req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id);
        if (!banner) return res.status(400).send({ error: true, msg: 'Banner with the given id not found.' })

        return res.status(200).send({ error: false, banner })
    }
    catch (err) {
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
})

export default bannerRoutes