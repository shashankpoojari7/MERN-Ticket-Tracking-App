import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './axios';
import { showNotification } from '../store/notificationSlice';

export const userLogin = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await api.post("/users/login", { email, password });

            thunkAPI.dispatch(
                showNotification({
                    message: response.data.message,
                    type: "success"
                })
            );

            return response.data.userData;
        } catch (error) {
            thunkAPI.dispatch(
                showNotification({
                    message: error.response?.data?.message || "Login failed",
                    type: "error",
                })
            );
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);

export const userRegister = createAsyncThunk(
    "auth/register",
    async ({ fullName, email, password }, thunkAPI) => {
        try {
            const response = await api.post("/users/register", {
                fullName,
                email,
                password,
            });

            thunkAPI.dispatch(
                showNotification({
                    message: response.data.message,
                    type: "success",
                })
            );

            return response.data.userData;
        } catch (error) {
            thunkAPI.dispatch(
                showNotification({
                    message: error.response?.data?.message || "Register failed",
                    type: "error",
                })
            );
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);

export const userLogout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const response = await api.post("/users/logout");
            thunkAPI.dispatch(
                showNotification({
                    message: response.data.message || "Logged out successfully",
                    type: "info",
                })
            );
            return true;
        } catch (error) {
            thunkAPI.dispatch(
                showNotification({
                    message: error.response?.data?.message || "Logout failed",
                    type: "error",
                })
            );

            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );
        }
    }
);