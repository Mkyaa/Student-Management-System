'use client'

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./app/auth/authSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

