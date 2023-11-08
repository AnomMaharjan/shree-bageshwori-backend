import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";
import bannerRoutes from "./routes/banners.js";
import userRoutes from "./routes/users.js";
import plansRouter from "./routes/plans.js";
import cors from "cors";

const app = express();
config();

app.use(express.json());
dbConnect();
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/banners", bannerRoutes);
app.use('/api/plans', plansRouter)
const port = process.env.PORT || 8080

app.listen(port, () => console.log(`listening on port ${port}`));