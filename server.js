import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";
import bannerRoutes from "./routes/banners.js";
import plansRouter from "./routes/plans.js";
import authRoutes from "./routes/auth.js";
import refreshRoutes from "./routes/refreshToken.js"
import testimonialRouter from "./routes/testimonials.js";

import cors from "cors";

const app = express();

config();

app.use(express.json());
dbConnect();
app.use(cors());

app.use("/api", authRoutes);
app.use("/api/refresh", refreshRoutes);
app.use("/api/banners", bannerRoutes);
app.use('/api/plans', plansRouter)
app.use('/api/testimonials', testimonialRouter)
const port = process.env.PORT || 8080

app.listen(port, () => console.log(`listening on port ${port}`));