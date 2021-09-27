import "./App.css";
import React, { useState } from "react";

import io from "socket.io-client";
import Chat from "./components/Chat/Chat";

const socket = io("http://localhost:3001");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  return (
    <div className="App">
      <h3>Chat</h3>
      <input
        type="text"
        placeholder="Bilal..."
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Room63..."
        onChange={(event) => setRoom(event.target.value)}
      />
      <button type="submit" onClick={joinRoom}>
        Join Room
      </button>
      <Chat socket={socket} name={name} room={room} />
    </div>
  );
}

export default App;
