const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  fieldOfEducation: { type: String, required: true },
  termsChecked: { type: Boolean, required: true },
  photo: { type: String },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
