import { getTicketsService } from "../services/ticket-service.js";

export const getTickets = async (req, res) => {
  try {
    const tickets = await getTicketsService();

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ error: "No hay tickets disponibles." });
    }

    res.json(tickets);
  } catch (error) {
    console.error("Error al obtener tickets:", error);
    res.status(500).json({ error: "Error al obtener los tickets." });
  }
};
