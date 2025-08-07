import { createSlice } from "@reduxjs/toolkit";
import { addTicket, deleteTicket, fetchTickets, updateTicket } from '../api/ticketApi';

const initialState ={
    tickets:[],
    isLoading: false,
    error:  null
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state) => {
                state.isLoading = true
                state.error = null 
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.tickets = action.payload
                state.isLoading = false
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(addTicket.pending, (state) => {
                state.isLoading = true
                state.error = null 
            })
            .addCase(addTicket.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(addTicket.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(deleteTicket.pending, (state) => {
                state.isLoading = true
                state.error = null 
            })
            .addCase(deleteTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.tickets = state.tickets.filter(ticket => ticket._id !== action.payload.id)
            })
            .addCase(deleteTicket.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(updateTicket.pending, (state) => {
                state.isLoading = true
                state.error = null 
            })
            .addCase(updateTicket.fulfilled, (state, action) => {
                state.isLoading = false
                const updatedTicket = action.payload.updatedTicket
                state.tickets = state.tickets.map((ticket) =>
                    ticket._id == updatedTicket._id ? updatedTicket : ticket
                )
            })
            .addCase(updateTicket.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
    }
})


export const { delTicket } = ticketSlice.actions
export default ticketSlice.reducer