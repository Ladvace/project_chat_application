import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { push } from "connected-react-router";
import io from "socket.io-client";
import login from "../../actions/login";
import logo from "../../assets/logo.png";
import "./Join.css";

let socket;

const Error = styled.div`
  color: red;
  margin-top: 20px;
`;

const Logo = styled.img`
  width: 300px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Input = styled.input`
  border: 0;
  margin-top: 20px;
  border-radius: 5px;
  padding: 15px 20px;
  width: 100%;
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
    if (!name && !room) {
      seTenterValidData(true);
      setTimeout(() => {
        seTenterValidData(false);
      }, 2000);
    } else if (!name || !room) {
      seTenterValidData(true);
      setTimeout(() => {
        seTenterValidData(false);
      }, 2000);
    } else {
      socket.emit("checkUser", { name: name, room: room }, (error) => {
        if (error) {
          console.log("err");
          alert("User Already Exist");
        } else {
          dispatch(login(name, room));
          dispatch(push("/chat"));
        }
      });
    }
  };

  return (
    <div className="joinOuterContainer">
      <InnerContainer>
        <Logo src={logo} />
        <div>
          <Input
            placeholder="Name"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <Input
            placeholder="Room"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <button
          onClick={(e) => joinRoom(e)}
          className={"button mt-20"}
          type="submit"
        >
          Sign In
        </button>
        <div>
          {enterValidData && <Error>Enter all the required data</Error>}
        </div>
      </InnerContainer>
    </div>
  );
}
