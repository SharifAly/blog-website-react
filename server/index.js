import express from "express";
import cors from "cors";
import mysql from "mysql2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// authentication

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

// User registration
// app.post("/register", async (req, res) => {
//   try {
//     const firstName = req.body.firstName; // firstName
//     const lastName = req.body.lastName; // lastName
//     const email = req.body.email; // email
//     const role = req.body.role; // role
//     const password = req.body.password; // password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const sql = `INSERT INTO blog.users (first_name, last_name, email, role, password ) VALUES (?, ?, ?, ?, ? ),;`;
//     db.query(sql, [firstName, lastName, email, role, hashedPassword]);
//     console.log("User registered successfully");
//     console.log(firstName, lastName, email, role, password);
//     res.status(200).json(firstName, lastName, email, role, password);
//   } catch (error) {
//     console.log(error);
//   }
// });
app.post("/register", (req, res) => {
  // get the data from the request body
  const fName = req.body.f_name;
  const lName = req.body.l_name;
  const email = req.body.email;
  const role = req.body.role;
  const password = req.body.password;
  // hash the incoming password
  const hashedPassword = bcrypt.hashSync(password, 10);
  // sql query to insert new user to database
  const sql =
    "INSERT INTO blog.users (first_name, last_name, email, role, password) VALUES (?,?,?,?,?)";
  // execute the query
  db.query(sql, [fName, lName, email, role, hashedPassword], (err, result) => {
    // if there is an error show it in the console
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      // if there is no error send the result to the client
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
