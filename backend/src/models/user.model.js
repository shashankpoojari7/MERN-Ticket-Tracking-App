import mongoose, {Schema} from "mongoose"

const userSchema = new Schema(
    {
        fullName:{
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
    },
    {timestamps: true}
)

export const User = mongoose.model("User",userSchema)
