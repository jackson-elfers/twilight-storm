import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { routes, api } from "../../config";
import { connect } from "../../redux";

function Main(props) {
  return (
    <div>
      <div className="box">
        <h3>{`${props.profile.title}`}</h3>
        <hr />
        <h2>{`${props.profile.first_name} ${props.profile.last_name}`}</h2>
        {props.profile.summary.split("\n").map((summaryParagraph, i) => {
          return <p key={`${summaryParagraph} - ${i}`}>{summaryParagraph}</p>;
        })}
      </div>

      <div className="box">
        <p>{`Address: ${props.profile.city}, ${props.profile.state}, ${props.profile.street}, ${props.profile.zip}`}</p>
        <p>{`Phone: ${props.profile.work_phone}`}</p>
        <p>{`Email: ${props.profile.work_email}`}</p>
      </div>
    </div>
  );
}
export default withRouter(connect(Main));
