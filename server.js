import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";
// import authRoutes from "./routes/auth.js";
// import refreshRoutes from "./routes/refreshToken.js";
// import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
config();

app.use(express.json());
dbConnect();
app.use(cors());
// app.use("/api", authRoutes);
// app.use("/api/refresh", refreshRoutes);
// app.use("/api/user/", userRoutes);
const port = process.env.PORT || 8080

app.listen(port, () => console.log(`listening on port ${port}`));