import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/smallLogo.png";
import "./InfoBar.css";

import { push } from "connected-react-router";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  padding: 0 5% 0 5%;
`;

const LeftInnerContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  svg {
    color: #33e6ba;
  }
`;

const CloseIcon = styled.div`
  svg {
    color: white;
  }
`;

const InfoBar = ({ room }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <LeftInnerContainer>
        <FontAwesomeIcon icon={faCircle} />
        &nbsp;
        <h3>room {room}</h3>
      </LeftInnerContainer>
      <img src={logo} />
      <CloseIcon>
        <FontAwesomeIcon icon={faTimes} onClick={() => dispatch(push("/"))} />
      </CloseIcon>
    </Container>
  );
};

export default InfoBar;
