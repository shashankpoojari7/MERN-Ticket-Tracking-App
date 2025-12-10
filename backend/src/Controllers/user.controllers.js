import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import jwt from 'jsonwebtoken'


const generateRefreshAndAccessToken = async(userid) => {
    try {
        const user = await User.findOne( { _id: userid })
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating Access and refresh Token")
    }
}

const registerUser = async(req,res) =>{
    const {fullName, email, password} = req.body

    if(!fullName || !email || !password){
        throw new ApiError(400, "All fields are required");
    }

    const loggedInUser = await User.findOne({email})

    if(loggedInUser){
        return res
        .status(409)
        .json({
            success: false,
            message: "Email has been already registered"
        })
    }

    const user = await User.create({
        fullName: fullName.toLowerCase(),
        email, //ES6 syntax
        password: password
    })
    
    if(!user){
        throw new ApiError(500, "Could not register, Something went wrong")
    }

    const userData = user.toObject();
    delete userData.password

    return res
    .status(200)
    .json({
        userData,
        success: true,
        message: "Registered successfully"
    })
}

const loginUser =  async(req,res) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new ApiError(400, "Username and email are required")
    }

    const user = await User.findOne( {email} );

    if(!user){
        return res
        .status(404)
        .json({
            success: false,
            message: "Email is not Registered, Please Sign-Up !!"
        })
    }

    const isAuthenticated = await user.isPasswordCorrect(password)

    if(!isAuthenticated){
        return res
        .status(401)
        .json({
            success: false,
            message: "Incorrect Password"
        })
    }

    const {accessToken, refreshToken} = await generateRefreshAndAccessToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
        userData:loggedInUser,
        accessToken,
        refreshToken,
        success: true,
        message: "Logged in successfully"
    })

}

const changeCurrentPassword = async(req,res)=>{
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json({
        message: "Password changed Successfully"
    })
}

const refreshAccessToken = async (req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid Refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is Expired")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken,refreshToken} = await generateRefreshAndAccessToken(user._id)
    
        return res.status(200)
        .cookie("accessToken",accessToken, options)
        .cookie("refreshToken",refreshToken, options)
        .json({
                data: {accessToken, refreshToken: refreshToken},
                message: "Access token refreshed"
        })
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

}

export {
    registerUser,
    loginUser,
    changeCurrentPassword,
    refreshAccessToken
}