const { PrismaClient } = require("@prisma/client");

class ClerkController {
  // Assign a service to a clerk
  async assignService(req, res) {
    try {
      const { serviceId } = req.body;
      const { clerkId } = req.params;

      if (!serviceId) {
        return res.status(400).json({
          success: false,
          message: "Missing serviceId",
        });
      }

      const updatedClerk = await prisma.user.update({
        where: { id: clerkId },
        data: { serviceId },
        include: { service: true },
      });

      res.json({
        success: true,
        message: `Clerk assigned to service ${updatedClerk.service?.name}`,
        clerk: updatedClerk,
      });
    } catch (err) {
      console.error("Assign service error:", err);
      res.status(500).json({ success: false, message: "Failed to assign service" });
    }
  }
}

module.exports = new ClerkController();
