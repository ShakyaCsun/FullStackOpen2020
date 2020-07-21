import React from "react";
import "./message.css";

const Message = ({ message, type }) => {
	if (message === null) {
		return null;
	}

	return <div className={`message ${type}`}>{message}</div>;
};

export default Message;
