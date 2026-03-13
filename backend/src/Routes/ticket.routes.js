import { Router } from "express";
import { addTicket, allTickets, deleteTicket, updateTicket } from "../Controllers/ticket.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/add-ticket").post(verifyJWT, addTicket);
router.route("/delete-ticket").delete(verifyJWT, deleteTicket);
router.route("/update-ticket").patch(verifyJWT, updateTicket);
router.route("/all-tickets").get(verifyJWT, allTickets);

export default router;