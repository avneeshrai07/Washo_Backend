// socket.js

io.on("connection", (socket) => {
    const { roomId } = socket.handshake.query;
  
    socket.join(roomId);
  
    socket.on("send_message", async (data) => {
      try {
        const newMessage = new Message(data);
        await newMessage.save();
        io.to(data.roomId).emit("receive_message", data); // Broadcast message
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });
  });
  