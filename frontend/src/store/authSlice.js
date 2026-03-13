import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister, userLogout } from "../api/userApi"; 


const initialState = {
    user: null, 
    isAuthenticated: false,
    error: null,
    isLoading: false,
    registerSuccess: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUserData: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.isLoading = true
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated =true
                state.isLoading = false
                state.error = null 
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(userRegister.pending, (state, action) => {
                state.isLoading = true
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.isLoading = false
                state.registerSuccess = true;
                state.error = null 
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = null;
            });
    }
})

export const { setCurrentUserData } = authSlice.actions;
export default authSlice.reducer