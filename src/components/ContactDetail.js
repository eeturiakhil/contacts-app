import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";

const ContactDetail = (props) => {
  const { name, email } = props.location.state.contact;
  return (
    <div className="main" style={{ marginTop: "65px" }}>
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div" style={{ textAlign: "center" }}>
        <Link to="/">
          <button className="ui button blue center">
            Back to Contacts List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
