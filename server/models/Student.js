const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentNumber: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  age: { type: Number, required: true },
  department: { type: String, required: true },
  scores: [
    {
      teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
      subject: { type: String, required: true },
      score: { type: Number, required: true },
    }
  ]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
