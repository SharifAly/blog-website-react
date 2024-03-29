import express from "express";
import cors from "cors";
import mysql from "mysql2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
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

app.post("/register", (req, res) => {
  // get the data from the request body
  try {
    const { f_name, l_name, email, password } = req.body;
    // hash the incoming password
    const hashedPassword = bcrypt.hashSync(password, 10);
    // sql query to check if email already exists
    const checkEmailExcist = "SELECT * FROM blog.users WHERE email = ?";
    db.query(checkEmailExcist, [email], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        if (result.length > 0) {
          // email already exists
          res.status(400).send("Email already exists");
        } else {
          // email does not exist, insert new user to database
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

// login

// values to decode jwt
// {2 items
// "header":{2 items
// "alg":"HS256"
// "typ":"JWT"
// }
// "payload":{4 items
// "userEmail":"sharif.aly_@outlook.com"
// "userId":11
// "iat":1707648117
// "exp":1707651717
// }
// }

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email; // Get email from request body
    const password = req.body.password; // Get password from request body

    const sql = `SELECT * FROM blog.users WHERE email =?`; // SQL query to retrieve user data from the database based on email

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
      // If no user is found with the given email, send an error response
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
      // If password matches
      const token = jwt.sign(
        {
          userEmail: result[0].email,
          userId: result[0].id,
        },
        process.env.JWT_SECRET_KEY, // Sign the JWT token with the secret key from environment variables
        { expiresIn: "1h" } // Set the expiration time for the token
      );

      return res.status(200).send({
        message: "Logged in!",
        token,
        userId: result[0].id,
      });
    }

    // If password doesn't match, send an error response
    return res.status(400).send({
      message: "Username or password incorrect!",
    });
  } catch (error) {
    // If there's an error, send an error response
    return res.status(400).send({
      message: "An error occurred!",
      error,
    });
  }
});

// test jwt decode function

// app.get("/jwt", (req, res) => {
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJzaGFyaWYuYWx5X0BvdXRsb29rLmNvbSIsInVzZXJJZCI6MTEsImlhdCI6MTcwNzY0ODU5NiwiZXhwIjoxNzA3NjUyMTk2fQ.5DQl_YGiLX40C681H7SuJSykmyhAMV2lj-PgTj4EJNc";
//   const decoded = jwtDecode(token);
//   res.send(decoded);
// });

// blog data section

// get all posts

app.get("/blog", (req, res) => {
  const sql = "SELECT * FROM blog.posts ORDER BY created_at DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// get four latest posts

app.get("/latest", (req, res) => {
  const sql = "SELECT * FROM blog.posts ORDER BY created_at DESC LIMIT 4";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// insert a new post to database

app.post("/post", (req, res) => {
  const { title, category, image, body } = req.body;
  const sql =
    "INSERT INTO blog.posts (title, category, image, body, fk_user_id) VALUES (?,?,?,?,?)";
  const token = req.headers.authorization;
  const decode = jwtDecode(token);
  const userId = decode.userId;
  db.query(sql, [title, category, image, body, userId], (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(result);
    }
  });
});

// const decode = () => {
//   const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJzaGFyaWYuYWx5X0BvdXRsb29rLmNvbSIsInVzZXJJZCI6MjksImlhdCI6MTcwODA5NDI2MiwiZXhwIjoxNzA4MDk3ODYyfQ.aeBQH5KnUqRQdcdD6IkSFd6N76M3A0MI5FwWtOYBH4U`;
//   const decoded = jwtDecode(token);
//   const userId = decoded.userId;
//   console.log(userId);
// };

// decode();

// get specific post

app.get("/details/:id", (req, res) => {
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

// get user id from all users

app.get("/profile/id", (req, res) => {
  const sql = "SELECT id FROM blog.users";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// get user profile

app.get("/profile/:id", (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
