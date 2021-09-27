import { useEffect, useState } from "react";

const Chat = ({ socket, name, room }) => {
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        name: name,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("MESSAGE:::", data);
    });
  }, [socket]);
  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="hi..."
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
