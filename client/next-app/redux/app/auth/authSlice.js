"use client";

import { createSlice } from "@reduxjs/toolkit";

const storedTeacher = localStorage.getItem("teacher");
if (storedTeacher === "undefined") {
  localStorage.clear();
}

const storedStudent = localStorage.getItem("student");
if (storedStudent === "undefined") {
  localStorage.clear();
}

const initialState = {
  teacher: !storedTeacher ? null : JSON.parse(storedTeacher),
  student: !storedStudent ? null : JSON.parse(storedStudent),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTeacher(state, action) {
      state.teacher = action.payload;
    },
    setStudent(state, action) {
      state.student = action.payload;
    },
  },
});

export const { setTeacher, setStudent } = authSlice.actions;
export default authSlice.reducer;
