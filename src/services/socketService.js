import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default {
  on(eventName, callback) {
    socket.on(eventName, callback);
  },
  emit(eventName, data) {
    socket.emit(eventName, data);
  },
};

/*
const socket = io(
  process.env.NODE_ENV === "production"
    ? "https://parlia-vote-transparency.onrender.com"
    : "http://localhost:3000",
  {
    transports: ["websocket", "polling"],
    withCredentials: true,
  }
);

export default socket;
*/
