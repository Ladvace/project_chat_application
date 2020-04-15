import React from "react";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";
import "./InfoBar.css";
import { useDispatch } from "react-redux";

import { push } from "connected-react-router";

const InfoBar = ({ room }) => {
  const dispatch = useDispatch();
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>room {room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a onClick={() => dispatch(push("/"))}>
          <img src={closeIcon} alt="close icon" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
