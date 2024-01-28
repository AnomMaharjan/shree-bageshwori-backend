import { Router } from "express";
import auth from "../middleware/auth.js";
import Info from "../models/Info.js";
import { infoValidate } from "../utils/infoValidator.js";

const infoRouter = Router();

infoRouter.get("/", async (req, res) => {
  try {
    const info = await Info.find();
    res.status(200).send({ error: false, info });
  } catch (ex) {
    res.status(500).send({ error: true, message: "Internal server error." });
  }
});

infoRouter.post("/", auth, async (req, res) => {
  try {
    const { error } = infoValidate(req.body);
    if (error)
      return res
        .status(400)
        .send({ error: true, message: error.details[0].message });

    const info = new Info({ ...req.body });
    await info.save();

    return res.status(201).send({ error: false, info });
  } catch (ex) {
    return res
      .status(500)
      .send({ error: true, message: "Internal server error." });
  }
});

infoRouter.put("/:id", auth, async (req, res) => {
  try {
    const { error } = infoValidate(req.body);
    if (error)
      return res
        .status(400)
        .send({ error: true, message: error.details[0].message });

    const info = await Info.findByIdAndUpdate(
      req.params.id,
      { ...req.body, createdAt: Date.now() },
      { new: true }
    );

    return res.status(201).send({ error: false, info });
  } catch (ex) {
    return res
      .status(500)
      .send({ error: true, message: "Internal server error." });
  }
});

infoRouter.delete("/:id", auth, async (req, res) => {
  try {
    let info = await Info.findById(req.params.id);
    if (!info)
      return res
        .status(404)
        .send({ status: false, msg: "Blog with the given id not found." });

    await info.deleteOne();
    return res.status(200).send({ status: true, info });
  } catch (err) {
    return res
      .status(500)
      .send({ error: true, message: "Internal Server Error." });
  }
});

export default infoRouter;
