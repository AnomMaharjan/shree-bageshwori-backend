import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";
import bannerRoutes from "./routes/banners.js";
import plansRouter from "./routes/plans.js";
import authRoutes from "./routes/auth.js";
import refreshRoutes from "./routes/refreshToken.js"
import testimonialRouter from "./routes/testimonials.js";
import blogsRouter from "./routes/blogs.js";
import cors from "cors";

const app = express();
//Loads .env file contents into process.env by default.
config();


app.use(express.json());
app.use(cors());
dbConnect();

app.use("/api", authRoutes);
app.use("/api/refresh", refreshRoutes);
app.use("/api/banners", bannerRoutes);
app.use('/api/plans', plansRouter)
app.use('/api/testimonials', testimonialRouter)
app.use('/api/blogs', blogsRouter)


const port = process.env.PORT || 8080

app.listen(port, () => console.log(`listening on port ${port}`));