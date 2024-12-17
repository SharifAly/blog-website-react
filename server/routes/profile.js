import express from "express";
import db from "../middleware/db.js";

const router = express.Router();

router.get("/profile/id", (req, res) => {
  const sql = "SELECT id FROM blog.users";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/profile/:id", (req, res) => {
  const params = req.params.id;
  const sql = "SELECT * FROM blog.users WHERE id = ?";
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

export default router;