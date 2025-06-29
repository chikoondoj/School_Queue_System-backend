const { Server } = require('socket.io');
const ActivityService = require('./activityService');
const QueueService = require('./queueService');
const SOCKET_EVENTS = require('../utils/socketEvents');

class SocketService {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });
    
    this.setupSocketHandlers();
  }

  setupSocketHandlers() {
    this.io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on(SOCKET_EVENTS.JOIN_QUEUE_ROOM, () => {
        socket.join('queue-room');
      });

      socket.on(SOCKET_EVENTS.STUDENT_JOINED_QUEUE, async (data) => {
        await this.handleStudentJoinedQueue(socket, data);
      });

      socket.on(SOCKET_EVENTS.STUDENT_LEFT_QUEUE, async (data) => {
        await this.handleStudentLeftQueue(socket, data);
      });

      socket.on(SOCKET_EVENTS.TICKET_CALLED, async (data) => {
        await this.handleTicketCalled(socket, data);
      });

      socket.on(SOCKET_EVENTS.SERVICE_STATUS_UPDATE, async (data) => {
        await this.handleServiceStatusUpdate(socket, data);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  }

  async handleStudentJoinedQueue(socket, data) {
    try {
      await ActivityService.logStudentJoinQueue(
        data.userId,
        data.ticketId,
        data.serviceId,
        data.details
      );

      const queueUpdate = await QueueService.getQueueStatus(data.serviceId);
      
      this.io.to('queue-room').emit(SOCKET_EVENTS.QUEUE_UPDATE, queueUpdate);
      this.io.to('queue-room').emit(SOCKET_EVENTS.STUDENT_JOINED_QUEUE, {
        userId: data.userId,
        ticketId: data.ticketId,
        serviceId: data.serviceId,
        position: data.position,
        estimatedWaitTime: data.estimatedWaitTime
      });
    } catch (error) {
      console.error('Error handling student joined queue:', error);
    }
  }

  async handleStudentLeftQueue(socket, data) {
    try {
      await ActivityService.logStudentLeaveQueue(
        data.userId,
        data.ticketId,
        data.serviceId,
        data.details
      );

      const queueUpdate = await QueueService.getQueueStatus(data.serviceId);
      
      this.io.to('queue-room').emit(SOCKET_EVENTS.QUEUE_UPDATE, queueUpdate);
      this.io.to('queue-room').emit(SOCKET_EVENTS.STUDENT_LEFT_QUEUE, {
        userId: data.userId,
        ticketId: data.ticketId,
        serviceId: data.serviceId
      });
    } catch (error) {
      console.error('Error handling student left queue:', error);
    }
  }

  async handleTicketCalled(socket, data) {
    try {
      await ActivityService.logTicketCalled(
        data.userId,
        data.ticketId,
        data.serviceId,
        data.details
      );

      this.io.to('queue-room').emit(SOCKET_EVENTS.TICKET_CALLED, {
        ticketId: data.ticketId,
        ticketNumber: data.ticketNumber,
        serviceId: data.serviceId,
        counter: data.counter
      });

      const queueUpdate = await QueueService.getQueueStatus(data.serviceId);
      this.io.to('queue-room').emit(SOCKET_EVENTS.QUEUE_UPDATE, queueUpdate);
    } catch (error) {
      console.error('Error handling ticket called:', error);
    }
  }

  async handleServiceStatusUpdate(socket, data) {
    try {
      await ActivityService.logServiceStatusChange(
        data.userId,
        data.serviceId,
        data.details
      );

      this.io.to('queue-room').emit(SOCKET_EVENTS.SERVICE_STATUS_UPDATE, {
        serviceId: data.serviceId,
        isActive: data.isActive,
        reason: data.reason
      });
    } catch (error) {
      console.error('Error handling service status update:', error);
    }
  }

  emitQueueUpdate(serviceId, queueData) {
    this.io.to('queue-room').emit(SOCKET_EVENTS.QUEUE_UPDATE, {
      serviceId,
      ...queueData
    });
  }

  emitTicketUpdate(ticketData) {
    this.io.to('queue-room').emit(SOCKET_EVENTS.TICKET_UPDATE, ticketData);
  }

  emitPositionUpdate(ticketId, position, estimatedWaitTime) {
    this.io.to('queue-room').emit(SOCKET_EVENTS.POSITION_UPDATE, {
      ticketId,
      position,
      estimatedWaitTime
    });
  }

  emitSystemHealthUpdate(healthData) {
    this.io.to('queue-room').emit(SOCKET_EVENTS.SYSTEM_HEALTH_UPDATE, healthData);
  }

  getConnectedUsers() {
    return this.io.sockets.sockets.size;
  }

  broadcastToAll(event, data) {
    this.io.emit(event, data);
  }

  broadcastToRoom(room, event, data) {
    this.io.to(room).emit(event, data);
  }
}

module.exports = SocketService;