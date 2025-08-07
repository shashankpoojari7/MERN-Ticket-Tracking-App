import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../api/userApi";
import { userRegister } from "../api/userApi";


const initialState = {
    user: {} ,
    isAuthenticated: false,
    error: null,
    isLoading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false,
            state.user = []
            localStorage.removeItem("user")
        },
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
                state.user = action.payload?.userData
                state.isAuthenticated =true
                state.isLoading = false
                state.error = null 
                localStorage.setItem('user',JSON.stringify(action.payload?.userData))
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
                state.user = action.payload?.userData
                state.isAuthenticated =true
                state.isLoading = false
                state.error = null 
                localStorage.setItem('user',JSON.stringify(action.payload?.userData))
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { logout, setCurrentUserData } = authSlice.actions;
export default authSlice.reducer