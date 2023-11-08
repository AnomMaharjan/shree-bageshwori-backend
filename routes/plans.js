import { Router } from "express";
import Plan from "../models/Plan.js";
import { validatePlan } from "../utils/plansValidator.js";

const plansRouter = Router()


//Get all plans
plansRouter.get('/', async (req, res) => {
    const plans = await Plan.find()
    res.status(200).json({ status: true, plans })
});


//Create plan
plansRouter.post('/', async (req, res) => {
    const { error } = validatePlan(req.body)
    if (error) return res.status(400).send({ status: false, msg: error.details[0].message })

    const plan = new Plan({
        title: req.body.title,
        subtitle: req.body.subtitle,
        price: req.body.price,
        offers: req.body.offers
    })

    await plan.save()
    return res.status(201).send({ status: true, plan })
})


//update plan
plansRouter.put('/:id', async (req, res) => {
    const { error } = validatePlan(req.body)
    if (error) return res.status(400).send({ status: false, msg: error.details[0].message })

    let plan = await Plan.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    if (!plan) return res.status(404).send({ status: false, msg: 'Plan with the given id not found' })

    // plan = Plan({
    //     ...req.body
    // })

    // await plan.save()
    return res.status(200).send({ status: true, plan })
})


//Delete plan
plansRouter.delete('/:id', async (req, res) => {
    let plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).send({ status: false, msg: "Plan with the given id not found." })

    await plan.deleteOne()
    return res.status(200).send({ status: true, plan })
})

export default plansRouter
