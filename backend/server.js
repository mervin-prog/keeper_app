import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import noteRoutes from "./routes/note.route.js";
import path from "path";

dotenv.config()

const app = express()
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({origin: "http://localhost:5173", credentials: true}));

//automatically parses the incoming json payloads to req.body
app.use(express.json());
app.use(cookieParser()); //allows to parse incoming cookies

//place specific routes first.
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}


app.listen(port, () =>{
    db();
    console.log(`Server is listening on Port ${port}`)
})


