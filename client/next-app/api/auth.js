import axios from 'axios';

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

// TEACHER

// Login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiEndpoint}/login`, { email, password });

    if (!response.status === 200) {
      const errorData = response.data;
      return { error: errorData }; 
    }
    return response.data;
  } catch (error) {
    return { error: error }; 
  }
};

// Signup
export const signup = async (formData) => {
  try {
    const response = await axios.post(`${apiEndpoint}/signup`, formData);

    if (response.status === 201) {
      return response; 
    } else {
      const errorData = response.data;
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw new Error(`An error occurred during signup: ${error}`);
  }
};

// STUDENT

// Login Student
export const loginStudent = async (studentNumber, password) => {
  try {
    // Convert student number to number
    const numericStudentNumber = parseInt(studentNumber);

    const response = await axios.post(`${apiEndpoint}/student/login`, {
      studentNumber: numericStudentNumber,
      password,
    });

    if (!response.status === 200) {
      const errorData = response.data;
      return { error: errorData };
    }

    const data = response.data;
    return data;
  } catch (error) {
    return { error: error };
  }
};
