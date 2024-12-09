const Message = require("./models/Message");

module.exports = (io) => {
  io.on("connection", (socket) => {
    const { roomId } = socket.handshake.query;

    // Join the room specified in the query
    socket.join(roomId);
    console.log(`User connected to room ${roomId}`);

    // Listen for incoming messages
    socket.on("send_message", async (data) => {
      try {
        // Save the message to MongoDB
        const newMessage = new Message(data);
        await newMessage.save();

        // Emit the message to all clients in the room
        io.to(data.roomId).emit("receive_message", newMessage);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    // Log disconnections
    socket.on("disconnect", () => {
      console.log(`User disconnected from room ${roomId}`);
    });
  });
};
