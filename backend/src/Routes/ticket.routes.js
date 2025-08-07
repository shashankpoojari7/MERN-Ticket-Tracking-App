import { Router } from "express";
import { addTicket, allTickets, deleteTicket, updateTicket } from "../Controllers/ticket.controllers.js";

const router = Router()

router.route("/add-ticket").post(addTicket)
router.route("/delete-ticket").delete(deleteTicket)
router.route("/update-ticket").patch(updateTicket)
router.route("/all-tickets").get(allTickets)

export default router;