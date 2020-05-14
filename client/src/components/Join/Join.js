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

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.button`
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  background: #ff6700;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
`;

const RandomChatButton = styled.button`
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  background: #ff6700;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
  margin-left: 20px;
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

  const joinRandomRoom = () => {
    socket.emit("randomChat", (error) => {
      if (error) {
        console.log("err");
        alert("Error while Connectiong");
      } else {
        // dispatch(login(name, room));
        // dispatch(push("/chat"));
      }
    });
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
        <Buttons>
          <Button onClick={(e) => joinRoom(e)} type="submit">
            Sign In
          </Button>
          <RandomChatButton onClick={(e) => joinRandomRoom(e)} type="submit">
            random chat
          </RandomChatButton>
        </Buttons>
        <div>
          {enterValidData && <Error>Enter all the required data</Error>}
        </div>
      </InnerContainer>
    </div>
  );
}
