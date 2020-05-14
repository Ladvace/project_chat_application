import React, { useState, useEffect } from "react";
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
  const [image, setImage] = useState(null);
  const [b64Image, setB64Image] = useState(null);

  const dispatch = useDispatch();

  let fileReader = new FileReader();
  let slice;

  const data = useSelector((state) => state.login);

  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);
    setRoom(data.room);
    setName(data.name);
    socket.emit("join", { name: data.name, room: data.room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("messagemessage", message);
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("disconnectChat", () => {
      dispatch(push("/"));
    });
  }, []);

  const uploadImage = async (e) => {
    console.log("IMG");
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setB64Image(reader.result);
      // this.setState({
      //   file: file,
      //   imagePreviewUrl: reader.result,
      // });
    };

    reader.readAsDataURL(file);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    console.log("PP", messages, setB64Image);
    if (b64Image) {
      console.log("TES", b64Image);
      socket.emit("sendMessage", { type: "img", content: b64Image }, () => {
        setB64Image(null);
        setMessage("");
      });
      // slice = image.slice(0, 100000);
      // fileReader.readAsArrayBuffer(slice);
      // fileReader.onload = (evt) => {
      //   let arrayBuffer = fileReader.result;
      // };
      // socket.emit("slice upload", {
      //   name: image.name,
      //   type: image.type,
      //   size: image.size,
      //   data: arrayBuffer,
      // });
    } else if (message && !b64Image) {
      console.log("M", message);
      socket.emit("sendMessage", { type: "text", content: message }, () =>
        setMessage("")
      );
    } else return;
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
          setImage={setImage}
          uploadImage={uploadImage}
        />
      </div>
    </>
  );
};

export default Chat;
