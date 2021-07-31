import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <img src={user} alt="user" className="ui avatar image" />
      <div className="content">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <Link
        to={{
          pathname: `delete-contact/${id}`,
          state: { contact: props.contact },
        }}
      >
        <i
          className="trash alternate outline icon"
          style={{ color: "red", marginTop: "10px", float: "right" }}
        ></i>
      </Link>
      <Link
        to={{
          pathname: "/edit",
          state: { contact: props.contact },
        }}
      >
        <i
          className="edit alternate outline icon"
          style={{
            color: "blue",
            marginTop: "10px",
            marginLeft: "10px",
            float: "right",
          }}
        ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
