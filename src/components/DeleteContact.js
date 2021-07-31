import React from "react";
import { Link } from "react-router-dom";

const DeleteContact = (props) => {
  const { id } = props.location.state.contact;

  const deleteContact = () => {
    props.removContactHanler(id);
    props.history.push("/");
  };

  return (
    <div className="ui main" style={{ marginTop: "65px" }}>
      <div className="ui card centered">
        <div className="content">
          <div className="description">
            Are you sure want to delete this contact?
          </div>
        </div>
      </div>
      <div className="center-div" style={{ textAlign: "center" }}>
        <Link to="/">
          <button className="ui button gray center">Cancel</button>
        </Link>
        <button className="ui button red center" onClick={deleteContact}>
          Confirm
        </button>
      </div>
    </div>
    // <div className="ui main">
    //     <div className="content">
    //         <h2>Are you sure want to delete this contact?</h2>
    //     </div>

    // </div>
  );
};

export default DeleteContact;
