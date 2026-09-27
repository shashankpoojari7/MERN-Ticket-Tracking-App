import mongoose from 'mongoose'

const ConnectDB = async() => {
    const DB_NAME = "ticket_app"
    try {
        console.log("MongoDB URI: ", process.env.MONGODB_URI);
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        if(!connection){
            console.log("MongoDB connection failed");
            return;
        }
        console.log("Database connected successfully")
    } catch (error) {
        console.log("MongoDB connection Error: ",error)
    }
}

export {ConnectDB}