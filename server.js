const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const uuid = require("uuid");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

const db = new sqlite3.Database("./db.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to SQLite database!");
});

app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

// app.get("/api/users", (req, res, next) => {
//   var sql = "select * from user";
//   var params = [];
//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// insert new users
app.post("/api/user/", (req, res, next) => {
  var errors = [];
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  var sql = "INSERT INTO user (username, email, password) VALUES (?,?,?)";
  var params = [data.username, data.email, data.password];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

// user authentication (login page)
app.post("/api/login/", (req, res, next) => {
  var data = {
    username: req.body.username,
    password: req.body.password,
  };
  res.header("Access-Control-Allow-Origin", "*"); // Change this to your actual origin if needed
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");

  var errors = [];

  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.username) {
    errors.push("No username specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var sql = `SELECT * FROM user WHERE username = ? AND password = ?`;
  var params = [data.username, data.password];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(401).send({ message: "Unauthorized access" });
      return;
    }
    res.json({ message: " Authorized success" });
  });
});

// timetable data
app.post("/api/timetable/", (req, res, next) => {
  const data = {
    major: req.body.major,
    year: req.body.year,
    semester: req.body.semester,
    day: req.body.day,
    time: req.body.time,
    courseName: req.body.courseName,
    roomNumber: req.body.roomNumber,
    courseType: req.body.courseType,
    instructorName: req.body.instructorName,
  };
  res.header("Access-Control-Allow-Origin", "*"); // Change this to your actual origin if needed
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  const sql = `INSERT INTO timetable (major, year, semester, time, day, courseName, roomNumber, courseType, instructorName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    data.major,
    data.year,
    data.semester,
    data.time,
    data.day,
    data.courseName,
    data.roomNumber,
    data.courseType,
    data.instructorName,
  ];
  db.run(sql, params, (err) => {
    if (err) {
      res.status(500).json({ error: "Error saving timetable" });
      return;
    }
    // Send session ID to client (e.g., in response body)
    res.json({ message: "Course Added Successfully!" });
  });
});

// retrieve timetable
app.post("/api/showTimetable/", (req, res, next) => {
  const data = {
    major: req.body.major,
    year: req.body.year,
    semester: req.body.semester,
  };
  res.header("Access-Control-Allow-Origin", "*"); // Change this to your actual origin if needed
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  const sql = `SELECT time, day, courseName, roomNumber, courseType, instructorName FROM timetable WHERE major = ? AND year = ? AND semester = ?`;
  const params = [data.major, data.year, data.semester];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Error fetching timetable" });
      return;
    }
    res.json({ timetable: rows });
  });
});

app.get("*", (req, res) => {
  res.send("404 Page Not Found");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
