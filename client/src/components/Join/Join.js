import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import login from "../../actions/login";
import "./Join.css";

let socket;

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const dispatch = useDispatch();

  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);

  const joinRoom = () => {
    if (!name || !room) {
      console.log("no name");
    } else {
      dispatch(login(name, room));
      console.log(name, room);
      socket.emit("join", { name, room }, (error) => {
        if (error) {
          alert(error);
        }
      });
      socket.emit("test", { name, room }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link onClick={(e) => joinRoom(e)} to={`/chat`}>
          <button className={"button mt-20"} type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
