// package
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// models
const Teacher = require("./models/Teacher");
const Student = require("./models/Student");

// Build a server
const app = express();
const PORT = 3001; // Server port

mongoose.connect("mongodb://localhost:27017/studentManageDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB bağlantısı başarılı!");
});

// CORS middleware
app.use(cors());

// Middlewares
app.use(bodyParser.json());

//////////////////////////////TEACHER/////////////////////////////////////////
// Teacher get route
app.get("/api/teachers", async (req, res) => {
  try {
    // Tüm öğretmenleri veritabanından çek
    const teachers = await Teacher.find({});
    res.json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Sunucu hatası");
  }
});

// // Teacher login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Teacher.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

// Teacher signup route
app.post("/api/signup", async (req, res) => {
  try {
    const { fullname, email, password, fieldOfEducation, termsChecked, photo } =
      req.body;

    // If the user already exists, return an error
    const existingUser = await Teacher.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email is already in use" });
    }

    // Create a new teacher
    const newTeacher = new Teacher({
      fullname,
      email,
      password,
      fieldOfEducation,
      termsChecked,
      photo,
    });

    // Save the new teacher to the database
    await newTeacher.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

//////////////////////////////STUDENT/////////////////////////////////////////

// Student get route
app.get("/api/students", async (req, res) => {
  try {
    // all students from the database
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

// Student login route
app.post("/api/student/login", async (req, res) => {
  const { studentNumber, password } = req.body;

  try {
    // Convert studentNumber to number
    const student = await Student.findOne({
      studentNumber: studentNumber,
      password: password,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Login successful", student });
  } catch (error) {
    console.error("Student Login error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

// Student signup route
app.post("/api/student/signup", async (req, res) => {
  try {
    const { studentNumber, password, adiSoyadi, age, department } = req.body;

    // If the student already exists, return an error
    const existingStudent = await Student.findOne({ studentNumber });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "This student number is already in use" });
    }

    // Create a new student
    const newStudent = new Student({
      studentNumber,
      password,
      adiSoyadi,
      age,
      department,
    });

    // Save the new student to the database
    await newStudent.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Student Signup error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

//////////////////////////////STUDENT ACTIONS/////////////////////////////////////////
// Student add note route
app.post("/api/students/addNote/:studentId/:teacherId", async (req, res) => {
  console.log("Not ekleme rotası çalışıyor");
  try {
    const { subject, score } = req.body;
    const studentId = req.params.studentId;
    const teacherId = req.params.teacherId;

    console.log("Öğrenci ID:", studentId);
    console.log("Öğretmen ID:", teacherId);
    console.log("Ders:", subject);
    console.log("Not:", score);

    // find student
    const student = await Student.findById(studentId);

    // add note to student
    student.scores.push({
      teacherId: teacherId,
      subject: subject, 
      score: score,
    });

    // save student
    await student.save();

    res.json(student);
  } catch (error) {
    console.error("Not ekleme rotası hatası:", error);
    res.status(500).json({ error: "Not eklenirken bir hata oluştu" });
  }
});

// Student delete score by teacherId route
app.delete(
  "/api/students/deleteScore/:studentId/:teacherId",
  async (req, res) => {
    console.log("Not silme rotası çalışıyor");
    try {
      const studentId = req.params.studentId;
      const teacherId = req.params.teacherId;

      console.log("Öğrenci ID:", studentId);
      console.log("Öğretmen ID:", teacherId);

      // find student
      const student = await Student.findById(studentId);
      console.log(student);

      // Filter the score to be deleted from the student's scores array
      student.scores = student.scores.filter(
        (score) => score.teacherId.toString() !== teacherId.toString()
      );
      console.log("Öğrencinin yeni notları:", student.scores);

      // save student
      await student.save();

      res.json(student);
    } catch (error) {
      console.error("Not silme rotası hatası:", error);
      res.status(500).json({ error: "Not silinirken bir hata oluştu" });
    }
  }
);

// Student update score route
app.put("/api/students/updateScore/:studentId/:teacherId", async (req, res) => {
  console.log("Not güncelleme rotası çalışıyor");
  try {
    const { subject, score } = req.body;
    const studentId = req.params.studentId;
    const teacherId = req.params.teacherId;

    console.log("Öğrenci ID:", studentId);
    console.log("Öğretmen ID:", teacherId);
    console.log("Ders:", subject);
    console.log("Not:", score);

    // find student
    const student = await Student.findById(studentId);

    // find the score to be updated
    const updatedScore = student.scores.find(
      (score) => score.teacherId.toString() === teacherId.toString()
    );

    if (!updatedScore) {
      return res.status(404).json({ error: "Güncellenecek not bulunamadı" });
    }

    // update the score
    updatedScore.subject = subject;
    updatedScore.score = score;

    // save student
    await student.save();

    res.json(student);
  } catch (error) {
    console.error("Not güncelleme rotası hatası:", error);
    res.status(500).json({ error: "Not güncellenirken bir hata oluştu" });
  }
});


app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
