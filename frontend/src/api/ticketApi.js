import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showNotification } from '../store/notificationSlice';


const fetchTickets =  createAsyncThunk('ticket/fetchTickets',async(_,thunkAPI) =>{
    try {
        const response = await axios.get('http://localhost:3000/api/tickets/all-tickets')
        return response.data?.data
    } catch (error) {
        thunkAPI.dispatch(
            showNotification({
                message: error.response?.data?.message || "Failed to fetch tickets.",
                type: "error"
            })
        )
        return thunkAPI.rejectWithValue(error.message)
    }
})

const addTicket = createAsyncThunk('ticket/addTickets', async({id, title, description},thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3000/api/tickets/add-ticket',
            {id, title, description}
        )
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
                message: error.response?.data?.message || "Failed to add ticket.",
                type: "error"
            })
        )
        return thunkAPI.rejectWithValue(error.message)
    }
})

const deleteTicket = createAsyncThunk('ticket/deleteTicket', async(id,thunkAPI) => {
    try {
        const response = await axios.delete('http://localhost:3000/api/tickets/delete-ticket',
            {
                data: { id }
            }
        )
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
                message: error.response?.data?.message || "Failed to delete ticket.",
                type: "error"
            })
        )
        return thunkAPI.rejectWithValue(error.response.data.message)
    }

})

const updateTicket = createAsyncThunk('ticket/updateTicket',async({id, status},thunkAPI) => {
    try {
        const response = await axios.patch('http://localhost:3000/api/tickets/update-ticket',
            {
                TicketId: id, 
                status, 
            }
        )
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
                message: error.response?.data?.message || "Failed to update ticket.",
                type: "error"
            })
        )
        return thunkAPI.rejectWithValue(error.response.message)
    }
})


export {
    fetchTickets,
    addTicket,
    deleteTicket,
    updateTicket
}
