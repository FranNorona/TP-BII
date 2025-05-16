import { Ticket } from "../dao/models/ticket-model.js";

class TicketRepository {
  async createTicket(ticketData) {
    return await Ticket.create(ticketData);
  }
}

export default new TicketRepository();
