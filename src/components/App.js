import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import DeleteContact from "./DeleteContact";

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Retrive Contacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const removContactHanler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const addContactHandler = async (contact) => {
    const request = { id: uuidv4(), ...contact };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (value) => {
    setSearchTerm(value);
    if (value !== "") {
      const filteredContacts = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setSearchResults(filteredContacts);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
            // component={() => (
            //   <AddContact addContactHandler={addContactHandler} />
            // )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
            // component={() => (
            //   <AddContact addContactHandler={addContactHandler} />
            // )}
          />
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length > 0 ? searchResults : contacts}
                term={searchTerm}
                searchKeyword={searchHandler}
                // getContactId={removContactHanler}
              />
            )}
            // component={() => (
            //   <ContactList
            //     contacts={contacts}
            //     getContactId={removContactHanler}
            //   />
            // )}
          />
          <Route
            path="/contact/:id"
            render={(props) => <ContactDetail {...props} />}
          />
          <Route
            path="/delete-contact/:id"
            render={(props) => (
              <DeleteContact
                {...props}
                removContactHanler={removContactHanler}
              />
            )}
          />
        </Switch>
        {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removContactHanler} /> */}
      </Router>
    </div>
  );
}

export default App;
