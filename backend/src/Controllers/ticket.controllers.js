import { ApiError } from "../utils/ApiError.js";
import { Ticket } from "../models/ticket.model.js"


const addTicket = async(req, res) => {
    const {id, title, description } = req.body

    const newTicket = await Ticket.create({
        owner: id,
        title,
        description
    })

    if(!newTicket){
        throw new ApiError(500, "Could not create a ticket")
    }

    return res
    .status(200)
    .json({
        success: true,
        message: "Ticket Created successfully"
    })
}

const deleteTicket = async(req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Ticket ID is required"
        });
    }

    const deletedTicket = await Ticket.deleteOne({_id : id})

    if(!deletedTicket){
        return res
        .status(500)
        .json({
            success: false,
            message: "Something went wrong while deleting the ticket"
        })
    }

    return res
    .status(200)
    .json({
        id,
        success: true,
        message: "Ticket deleted successfully"
    })
}

const updateTicket = async (req, res) => {
    const { TicketId, status } = req.body

    if(!TicketId || !status){
        return res.status(404).json({
            success: false,
            message: "All fields are Required"
        });
    }

    const ticket = await Ticket.findById(TicketId)

    
    if (!ticket) {
        return res.status(404).json({
            success: false,
            message: "Ticket not found"
        });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
        TicketId,
        { status: status },
        { new: true }
    )

    if(!updatedTicket){
        return res
        .status(500)
        .json({
            success: false,
            message: "Something went wrong while updating ticket"
        })
    }

    return res
        .status(200)
        .json({
            updatedTicket,
            success: true,
            message: "Ticket updated successfully"
        })
}

const allTickets = async(req, res) => {
    const tickets = await Ticket.find()

    if(tickets.length == 0){
        return res
        .status(200)
        .json({
            data:tickets,
            success: true,
            message: "No tickets found"
        })
    }

    setTimeout(() => {
        return res
        .status(200)
        .json({
            data: tickets,
            success: true,
            message: "Tickets fetched successfully"
        })
    }, 1000);
}


export{
    addTicket,
    deleteTicket,
    updateTicket,
    allTickets
}