const { Models } = require("../models");

// Clerk: call next ticket by ID
async function callNext(req, res) {
  try {
    const updated = await Models.updateTicketStatus(
      req.params.id,
      "CALLED",
      new Date()
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Clerk: auto-call next waiting ticket for a service
async function callNextForService(req, res) {
  try {
    const clerkId = req.user.id;
    const nextTicket = await Models.getNextWaitingTicket(req.params.serviceId);
    if (!nextTicket) {
      return res.json({ success: false, message: "No waiting tickets" });
    }

    const updated = await Models.updateTicketStatus(
      nextTicket.id,
      "CALLED",
      new Date(),
      clerkId
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Clerk: mark ticket as IN_PROGRESS
async function markInProgress(req, res) {
  try {
    const updated = await Models.updateTicketStatus(req.params.id, "IN_PROGRESS");
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Clerk: mark ticket as COMPLETED
async function completeTicket(req, res) {
  try {
    const updated = await Models.updateTicketStatus(
      req.params.id,
      "COMPLETED",
      null,
      new Date()
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Clerk: cancel ticket
async function cancelTicket(req, res) {
  try {
    const updated = await Models.cancelTicket(req.params.id);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Clerk: view active queue for a service
async function getQueueByService(req, res) {
  try {
    const queue = await Models.getQueueByService(req.params.serviceId);
    res.json({ success: true, data: queue });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  callNext,
  callNextForService,
  markInProgress,
  completeTicket,
  cancelTicket,
  getQueueByService,
};
