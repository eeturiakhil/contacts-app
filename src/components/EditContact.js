import React, { Component } from "react";

class EditContact extends Component {
  constructor(props) {
    super(props);
    const { id, name, email } = props.location.state.contact;
    this.state = {
      id,
      name,
      email,
    };
  }

  updateContact = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All the fields are mandatory.");
      return;
    }
    this.props.updateContactHandler(this.state);
    this.setState({ name: "", email: "" });
    this.props.history.push("/");
  };

  cancelUpdate = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="ui main add-contact-container">
        <h2>Edit Contact</h2>
        <form className="ui form" onSubmit={this.updateContact}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <button className="ui button blue">Update</button>
          <button className="ui button gray" onClick={this.cancelUpdate}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default EditContact;
