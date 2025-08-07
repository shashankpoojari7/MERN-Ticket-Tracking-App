import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"

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

    const userEmail = await User.findOne( {email} );

    if(!userEmail){
        return res
        .status(404)
        .json({
            success: false,
            message: "Email is not Registered, Please Sign-Up !!"
        })
    }

    const isAuthenticated = userEmail.password === password ? true : false

    if(!isAuthenticated){
        return res
        .status(401)
        .json({
            success: false,
            message: "Incorrect Password"
        })
    }

    const userData = userEmail.toObject();
    delete userData.password;

    return res
    .status(200)
    .json({
        userData,
        success: true,
        message: "Logged in successfully"
    })

}

export {
    registerUser,
    loginUser
}