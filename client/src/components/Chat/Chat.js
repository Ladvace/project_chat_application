import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { push } from "connected-react-router";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  const data = useSelector((state) => state.login);

  console.log("d", data);

  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    // const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setRoom(data.room);
    socket.emit("join", { name: data.name, room: data.room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("disconnectChat", () => {
      dispatch(push("/"));
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      console.log("messaggio", message, socket);
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <>
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </>
  );
};

export default Chat;
