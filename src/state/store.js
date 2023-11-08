import { configureStore } from "@reduxjs/toolkit";
import authReducers from './authslice'

const store =configureStore({
    reducer:authReducers
})

export default store;