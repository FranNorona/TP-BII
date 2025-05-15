import { TicketRepository } from "../repository/ticket-repository";
import { v4 as uuidv4 } from "uuid";

export const generateTicketService = async (purchaser, amount ) => {
    const ticketData = {
        code: uuidv4(),
        amount,
        purchaser,
    };

    return await TicketRepository.createTicket(ticketData);
};