//index.ts
import express from "express";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route";
import { connectDB } from "./lib/db"
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);



app.listen(PORT,() => {
    console.log("Server is running on PORT:" + PORT);
    connectDB()
});