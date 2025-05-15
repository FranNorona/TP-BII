import { Ticket } from "../dao/models/ticket-model";

class TicketRepository {
    async createTicket(ticketData)  {
        return await Ticket.create(ticketData);
    }
}

export const TicketRepository = new TicketRepository();