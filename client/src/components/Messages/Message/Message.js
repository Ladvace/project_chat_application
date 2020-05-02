import React from "react";
import styled from "styled-components";

import "./Message.css";

import ReactEmoji from "react-emoji";

const Image = styled.img`
  max-width: 300px;
  max-height: 300px;
  background: ${(props) => (props.color === "dark" ? "#353535" : "white")};
`;

const Message = ({ message: { content, user }, name }) => {
  let isSentByCurrentUser = false;

  console.log("D", content.content);

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return content.type === "text" ? (
    isSentByCurrentUser ? (
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">you</p>
        <div className="messageBox backgroundBlue">
          <p className="messageText colorWhite">
            {ReactEmoji.emojify(content.content)}
          </p>
        </div>
      </div>
    ) : (
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">
            {ReactEmoji.emojify(content.content)}
          </p>
        </div>
        <p className="sentText pl-10 ">{user}</p>
      </div>
    )
  ) : isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">you</p>
      <div className="messageBox backgroundBlue">
        <Image
          className="messageText colorWhite"
          color="white"
          src={content.content}
          // img={content.content}
        />
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <Image
          className="messageText colorDark"
          color="dark"
          src={content.content}
          // img={content.content}
        />
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Message;
