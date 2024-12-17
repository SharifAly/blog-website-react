import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../middleware/db.js";

const router = express.Router();

router.post("/register", (req, res) => {
  try {
    const { f_name, l_name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const checkEmailExcist = "SELECT * FROM blog.users WHERE email = ?";
    db.query(checkEmailExcist, [email], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        if (result.length > 0) {
          res.status(400).send("Email already exists");
        } else {
          const registerNewUserQuery =
            "INSERT INTO blog.users (first_name, last_name, email, password) VALUES (?,?,?,?)";
          db.query(
            registerNewUserQuery,
            [f_name, l_name, email, hashedPassword],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send("Internal Server Error");
              } else {
                res.send(result);
              }
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM blog.users WHERE email =?`;

    const result = await new Promise((resolve, reject) => {
      db.query(sql, [email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (result.length === 0) {
      return res.status(400).send({
        message: "Username or password incorrect!",
      });
    }

    const bResult = await new Promise((resolve, reject) => {
      bcrypt.compare(password, result[0]["password"], (bErr, bResult) => {
        if (bErr) {
          reject(bErr);
        } else {
          resolve(bResult);
        }
      });
    });

    if (bResult) {
      const token = jwt.sign(
        {
          userEmail: result[0].email,
          userId: result[0].id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 5 * 60 * 60 * 1000, // 5 hours
      });

      return res.status(200).send({
        message: "Logged in!",
        userId: result[0].id,
      });
    }

    return res.status(400).send({
      message: "Username or password incorrect!",
    });
  } catch (error) {
    return res.status(400).send({
      message: "An error occurred!",
      error,
    });
  }
});

export default router;