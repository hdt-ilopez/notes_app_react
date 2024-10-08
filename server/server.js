import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import checkAuthToken from "./middleware/authMiddleware.js";

import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";

dotenv.config();

// CONFIGURATION

const app = express();
const __dirname = path.resolve();
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/dist")));

// ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/notes", checkAuthToken, notesRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// DATABASE CONNECTION AND SERVER START
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect `));
