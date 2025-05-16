import { Ticket } from "../dao/models/ticket-model.js";

class TicketRepository {
  async createTicket(ticketData) {
    return await Ticket.create(ticketData);
  }

  async getAllTickets() {
    return await Ticket.find({});
  }
}

export default new TicketRepository();
