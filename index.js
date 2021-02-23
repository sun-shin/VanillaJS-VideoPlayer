require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("./config");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/users", async (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      res.json(error);
      return;
    }
    res.status(200).json(results.rows);
  });
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);

    const name = req.body.name;
    const email = req.body.email;

    pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, password",
      [name, email, hashedPassword],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);
        res.status(201).json(results.rows[0]);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const user = userResult.rows[0];
    // console.log(user);
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
