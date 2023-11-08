import { Router } from "express";
import Banner from "../models/Banner.js";
import { bannerValidate } from '../utils/bannerValidator.js'
const bannerRoutes = Router()

//Get all banners
bannerRoutes.get('/', async (req, res) => {
    const banners = await Banner.find()

    return res.status(200).send({ status: true, banners })
})

//Get banner by id
bannerRoutes.get("/:id", async (req, res) => {
    const banner = await Banner.findById(req.params.id)
    if (!banner) return res.status(400).send({ status: false, msg: 'Banner with the given id not found.' })

    return res.status(200).send({ status: true, banner })
})

//Create banner
bannerRoutes.post('/', async (req, res) => {
    const { error } = bannerValidate(req.body)
    if (error) return res.status(400).send({ status: false, msg: error.details[0].message })

    const banner = new Banner({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    })

    await banner.save()
    return res.status(201).send({ status: true, banner })
})

//Update banner
bannerRoutes.put('/:id', async (req, res) => {
    const { error } = bannerValidate(req.body)
    if (error) return res.status(400).send({ status: false, msg: error.details[0].message })


    const banner = await Banner.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            createdAt: Date.now()
        },
        { new: true }
    )
    if (!banner) return res.status(400).send({ status: false, msg: 'Banner with the given id not found.' })


    return res.status(200).send({ status: true, banner })
})

//Delete Banner
bannerRoutes.delete('/:id', async (req, res) => {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(400).send({ status: false, msg: 'Banner with the given id not found.' })

    return res.status(200).send({ status: true, banner })
})

export default bannerRoutes