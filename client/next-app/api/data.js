import axios from 'axios';

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

// TEACHER

// Get Teachers
export const getTeachers = async () => {
  try {
    const response = await axios.get(`${apiEndpoint}/teachers`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// STUDENT

// Get Students
export const getStudents = async () => {
  try {
    const response = await axios.get(`${apiEndpoint}/students`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// STUDENT ACTION FUNCTIONS

// Add note to student
export const addNoteToStudent = async (studentId, teacherId, subject, score) => {
  try {
    const response = await axios.post(`${apiEndpoint}/students/addNote/${studentId}/${teacherId}`, {
      subject,
      score,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete score from student
export const deleteScoreFromStudent = async (studentId, teacherId) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/students/deleteScore/${studentId}/${teacherId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update score for student
export const updateScoreForStudent = async (studentId, teacherId, subject, score) => {
  try {
    const response = await axios.put(`${apiEndpoint}/students/updateScore/${studentId}/${teacherId}`, {
      subject,
      score,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
