import express from "express";
import jwt from "jsonwebtoken";
import db from "../middleware/db.js";

const router = express.Router();

router.get("/blog", (req, res) => {
  const sql = "SELECT * FROM blog.posts ORDER BY created_at DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/latest", (req, res) => {
  const sql = "SELECT * FROM blog.posts ORDER BY created_at DESC LIMIT 4";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/post", (req, res) => {
  const { title, category, image, body } = req.body;
  const sql =
    "INSERT INTO blog.posts (title, category, image, body, fk_user_id) VALUES (?,?,?,?,?)";
  const token = req.cookies.token;
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decode.userId;
  db.query(sql, [title, category, image, body, userId], (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(result);
    }
  });
});

router.get("/details/:id", (req, res) => {
  const params = req.params.id;
  const sql = "SELECT * FROM blog.posts WHERE id = ?";
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

export default router;