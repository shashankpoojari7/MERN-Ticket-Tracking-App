import {configureStore} from '@reduxjs/toolkit';
import ticketReducer from './ticketSlice.js'
import authReducer from './authSlice.js'
import notificatoinSlice from './notificationSlice.js'

const store = configureStore({
    reducer: {
        ticket: ticketReducer,
        auth: authReducer,
        notification: notificatoinSlice
    }
})

export default store