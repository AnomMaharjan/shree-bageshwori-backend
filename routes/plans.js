import { Router } from "express";
import Plan from "../models/Plan.js";
import { validatePlan } from "../utils/plansValidator.js";
import auth from '../middleware/auth.js'

const plansRouter = Router()


//Get all plans
plansRouter.get('/', async (req, res) => {
    try {
        const plans = await Plan.find()
        res.status(200).json({ status: true, plans })
    }
    catch (err) {
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
});


//Create plan
plansRouter.post('/', auth, async (req, res) => {
    try {
        const { error } = validatePlan(req.body)
        if (error) return res.status(400).send({ status: false, msg: error.details[0].message })

        const plan = new Plan({
            title: req.body.title,
            subtitle: req.body.subtitle,
            price: req.body.price,
            offers: req.body.offers,
            type: req.body.type,
            isPopular: req.body.isPopular
        })

        await plan.save()
        return res.status(201).send({ status: true, plan })
    }
    catch (err) {
        console.error(err)
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
})


//update plan
plansRouter.put('/:id', auth, async (req, res) => {
    try {
        const { error } = validatePlan(req.body)
        if (error) return res.status(400).send({ status: false, msg: error.details[0].message })

        let plan = await Plan.findByIdAndUpdate(req.params.id, { ...req.body, createdAt: Date.now() }, { new: true })
        if (!plan) return res.status(404).send({ status: false, msg: 'Plan with the given id not found' })


        return res.status(200).send({ status: true, plan })
    }
    catch (err) {
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
})


//Delete plan
plansRouter.delete('/:id', auth, async (req, res) => {
    try {
        let plan = await Plan.findById(req.params.id);
        if (!plan) return res.status(404).send({ status: false, msg: "Plan with the given id not found." })

        await plan.deleteOne()
        return res.status(200).send({ status: true, plan })
    }
    catch (err) {
        return res.status(500).send({ error: true, message: "Internal Server Error." })
    }
})

export default plansRouter
