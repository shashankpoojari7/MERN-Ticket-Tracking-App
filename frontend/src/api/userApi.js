import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showNotification } from '../store/notificationSlice';

const userLogin = createAsyncThunk('auth/login', async({email, password},thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:3000/api/users/login",
            {email, password}
        );
        thunkAPI.dispatch(
            showNotification({
                message: response.data.message,
                type: "success"
            })
        )
        return response.data
    } catch (error) {
        thunkAPI.dispatch(
            showNotification({
                message: error.response.data.message,
                type: "error"
            })
        )
        return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
})

const userRegister = createAsyncThunk('auth/register', async({fullName, email, password},thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:3000/api/users/register",
            {fullName, email, password}
        );
        thunkAPI.dispatch(
            showNotification({
                message: response.data.message,
                type: "success"
            })
        )
        return response.data
    } catch (error) {
        thunkAPI.dispatch(
            showNotification({
                message: error.response.data.message,
                type: "error"
            })
        )
        return thunkAPI.rejectWithValue(error.message)
    }
})

export {
    userRegister,
    userLogin,
}