import React, { useSelector } from "react";
import styled from "styled-components";

import "./Message.css";

import ReactEmoji from "react-emoji";

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.justify === "justifyEnd" ? "flex-end" : "flex-start"};
  padding: 0 5%;
  margin-top: 3px;
`;

const MessageBox = styled.div`
  background: ${(props) => (props.bg === "main" ? "#ff6700" : "#F3F3F3")};
  border-radius: 20px;
  min-width: 80px;
  padding: 10px;
  color: white;
  display: inline-block;
  max-width: 80%;
  p {
    text-align: center;
  }
`;

const Image = styled.img`
  max-width: 400px;
  max-height: 300px;
  background: ${(props) => (props.color === "dark" ? "#353535" : "white")};
  border-radius: 10px;
`;

const Message = ({ message: { content, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  console.log("DD", trimmedName, trimmedName === "you", user);

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return content.type === "text" ? (
    isSentByCurrentUser ? (
      <MessageContainer justify={"justifyEnd"}>
        <p className="sentText pr-10">{user}</p>
        <MessageBox bg={"main"}>
          <p className="messageText colorWhite">
            {ReactEmoji.emojify(content.content)}
          </p>
        </MessageBox>
      </MessageContainer>
    ) : (
      <MessageContainer justify={"justifyStart"}>
        <MessageBox bg={"white"}>
          <p className="messageText colorDark">
            {ReactEmoji.emojify(content.content)}
          </p>
        </MessageBox>
        <p className="sentText pl-10 ">{user}</p>
      </MessageContainer>
    )
  ) : isSentByCurrentUser ? (
    <MessageContainer justify={"justifyEnd"}>
      <p className="sentText pr-10">Stranger</p>
      <MessageBox bg={"main"}>
        <Image
          className="messageText colorWhite"
          color="white"
          src={content.content}
          // img={content.content}
        />
      </MessageBox>
    </MessageContainer>
  ) : (
    <MessageContainer justify={"justifyStart"}>
      <MessageBox bg={"white"}>
        <Image
          className="messageText colorDark"
          color="dark"
          src={content.content}
          // img={content.content}
        />
      </MessageBox>
      <p className="sentText pl-10 ">{user}</p>
    </MessageContainer>
  );
};

export default Message;
