const express = require("express");
const router = express.Router();
const { Models } = require("../models");

// Get all tickets (optionally filtered)
router.get("/all", async (req, res) => {
  try {
    const { status, serviceId, userId } = req.query;
    const filters = {};
    if (status) filters.status = status;
    if (serviceId) filters.serviceId = serviceId;
    if (userId) filters.userId = userId;

    const tickets = await Models.getAllTickets(filters);
    res.json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch tickets", error: error.message });
  }
});

// Get all active tickets (optionally filtered)
router.get("/active", async (req, res) => {
  try {
    const { serviceId, userId } = req.query;
    const filters = {};
    if (serviceId) filters.serviceId = serviceId;
    if (userId) filters.userId = userId;

    const tickets = await Models.getAllActiveTickets(filters);
    res.json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch active tickets", error: error.message });
  }
});

// Get a single ticket by ID
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Models.getTicketById(req.params.id);
    if (!ticket) return res.status(404).json({ success: false, message: "Ticket not found" });
    res.json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch ticket", error: error.message });
  }
});

// Cancel a ticket
router.post("/:id/cancel", async (req, res) => {
  try {
    const ticket = await Models.cancelTicket(req.params.id);
    res.json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to cancel ticket", error: error.message });
  }
});

// Delete a ticket
router.delete("/:id", async (req, res) => {
  try {
    await Models.deleteTicket(req.params.id);
    res.json({ success: true, message: "Ticket deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete ticket", error: error.message });
  }
});

module.exports = router;