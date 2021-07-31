import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  //   const deleteContactHandler = (id) => {
  //     props.getContactId(id);
  //   };

  const searchEle = useRef("");

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        // clickHandler={deleteContactHandler}
        key={contact.id}
      ></ContactCard>
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(searchEle.current.value);
  };

  return (
    <div className="ui main add-contact-container">
      <h2>
        Contacts List
        <Link to="/add">
          <button className="ui button blue right" style={{ float: "right" }}>
            Add Contact
          </button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={searchEle}
            type="text"
            name="search"
            className="prompt"
            placeholder="Search Contacts"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts Available"}
      </div>
    </div>
  );
};

export default ContactList;
