const  messageSchema  = require("../../database/messageModel");

module.exports = (io) => {
  io.on("connection", (socket) => {
    const { roomId } = socket.handshake.query;

    if (!roomId) {
      console.error("Room ID not provided in query");
      socket.disconnect(); // Disconnect the socket if roomId is missing
      return;
    }

    socket.join(roomId);
    console.log(`User connected to room: ${roomId}`);

    // Handle disconnection
    socket.on("disconnect", (reason) => {
      console.log(`User disconnected from room ${roomId}. Reason: ${reason}`);
    });

    // Handle incoming messages
    socket.on("send_message", async (data) => {
      console.log(`Message received in room ${roomId}:`, data);

      try {
        // Save the message to the database and emit it to the room
        const { roomId, sender_type, name, message, timestamp } = data;
        const newMessage = new messageSchema({
          roomId,
          sender_type,
          name,
          message,
          timestamp: new Date().getTime(),
        });
        
        // Save the new message in the database
        await newMessage.save();

        // Emit the saved message to the room
        io.to(roomId).emit("receive_message", newMessage);

      } catch (error) {
        console.error("Error handling message:", error);
      }
    });
  });
};
