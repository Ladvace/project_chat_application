import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import io from "socket.io-client";
import login from "../../actions/login";
import "./Join.css";

let socket;

const Error = styled.div`
  color: red;
  margin-top: 20px;
`;

export default function SignIn() {
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const [enterValidData, seTenterValidData] = useState(false);

  const dispatch = useDispatch();

  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);

  const joinRoom = () => {
    dispatch(login(name, room));
    dispatch(push("/chat"));

    console.log("n room", name, room);
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
        <Link
          onClick={(e) => (!name && !room ? e.preventDefault() : joinRoom(e))}
        >
          <button className={"button mt-20"} type="submit">
            Sign In
          </button>
        </Link>
        <div>
          {!name && !room && <Error>Enter all the required data</Error>}
        </div>
      </div>
    </div>
  );
}
