import TicketRepository from "../repository/ticket-repository.js";
import { v4 as uuidv4 } from "uuid";

export const generateTicketService = async (purchaser, amount) => {
  const ticketData = {
    code: uuidv4(),
    amount,
    purchaser,
  };

  return await TicketRepository.createTicket(ticketData);
};

export const getTicketsService = async () => {
  return await TicketRepository.getAllTickets();
};
