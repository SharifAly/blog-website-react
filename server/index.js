import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./middleware/db.js";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";
import profileRoutes from "./routes/profile.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  db.query("SELECT * FROM blog.users", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
      console.log(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});