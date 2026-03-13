import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './axios'
import { showNotification } from '../store/notificationSlice';

export const fetchTickets = createAsyncThunk(
    'ticket/fetchTickets',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/tickets/all-tickets');
            return response.data?.data;
        } catch (error) {
            thunkAPI.dispatch(
                showNotification({
                    message: error.response?.data?.message || "Failed to fetch tickets.",
                    type: "error"
                })
            );
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addTicket = createAsyncThunk(
    'ticket/addTicket',
    async ({ id, title, description }, thunkAPI) => {
        try {
            const response = await api.post('/tickets/add-ticket', {
                id,
                title,
                description
            });

            thunkAPI.dispatch(
                showNotification({
                    message: response.data.message,
                    type: "success"
                })
            );

            return response.data;
        } catch (error) {
            thunkAPI.dispatch(
                showNotification({
                    message: error.response?.data?.message || "Failed to add ticket.",
                    type: "error"
                })
            );
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteTicket = createAsyncThunk(
    'ticket/deleteTicket',
    async (id, thunkAPI) => {
        try {
            const response = await api.delete('/tickets/delete-ticket', {
                data: { id }
            });

            thunkAPI.dispatch(
                showNotification({
                    message: response.data.message,
                    type: "success"
                })
            );

            return response.data;
        } catch (error) {
            thunkAPI.dispatch(
                showNotification({
                    message: error.response?.data?.message || "Failed to delete ticket.",
                    type: "error"
                })
            );
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateTicket = createAsyncThunk(
    'ticket/updateTicket',
    async ({ id, status }, thunkAPI) => {
        try {
            const response = await api.patch('/tickets/update-ticket', {
                TicketId: id,
                status,
            });

            thunkAPI.dispatch(
                showNotification({
                    message: response.data.message,
                    type: "success"
                })
            );

            return response.data;
        } catch (error) {
            thunkAPI.dispatch(
                showNotification({
                    message: error.response?.data?.message || "Failed to update ticket.",
                    type: "error"
                })
            );
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
