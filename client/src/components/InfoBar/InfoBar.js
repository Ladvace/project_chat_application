import React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";
import "./InfoBar.css";

import { push } from "connected-react-router";

const InfoBar = ({ room }) => {
  const dispatch = useDispatch();
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <FontAwesomeIcon icon={faCircle} style={{ color: "#33e6ba" }} />
        &nbsp;
        <h3>room {room}</h3>
      </div>
      <div className="rightInnerContainer">
        <FontAwesomeIcon icon={faTimes} onClick={() => dispatch(push("/"))} />
      </div>
    </div>
  );
};

export default InfoBar;
