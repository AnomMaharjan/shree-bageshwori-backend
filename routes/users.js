import { Router } from "express";
import User from "../models/User.js";

const userRoutes = Router()


userRoutes.get('/signup', async (req, res) => {
    const user = await User.find()
    return res.status(200).send(user)
})


export default userRoutes