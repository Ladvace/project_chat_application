import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faImage } from "@fortawesome/free-solid-svg-icons";

import "./Input.css";

const UploadButton = styled.div`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #ff6700;
  display: inline-block;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 20px;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;
  }
  svg {
    position: absolute;
  }
`;

function Input({ setMessage, sendMessage, message, setImage, uploadImage }) {
  // const Send = (msg) => {
  //   sendMessage(msg);

  //   // if (!image) {
  //   // } else {
  //   // }
  // };

  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <UploadButton>
        <input type="file" onChange={(e) => uploadImage(e)} />
        <FontAwesomeIcon icon={faImage} />
      </UploadButton>
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        <FontAwesomeIcon icon={faCaretRight} size="2x" />
      </button>
    </form>
  );
}

export default Input;
