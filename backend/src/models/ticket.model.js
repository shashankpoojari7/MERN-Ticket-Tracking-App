import mongoose , {Schema} from 'mongoose'

const ticketSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Pending","In-Progress","Resolved"],
            default: "Pending"
        },
        heldBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
    ,{timestamps: true}
)


export const Ticket = mongoose.model("Tickets",ticketSchema)