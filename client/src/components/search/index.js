import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { routes, api } from "../../config";
import { connect } from "../../redux";

function Main(props) {
  return (
    <Link to={`${props.link}`}>
      <div>
        <div className="box">
          <h3>{`${props.profile.title}`}</h3>
          <hr />
          <h2>{`${props.profile.first_name} ${props.profile.last_name}`}</h2>
          <p>{`${props.profile.summary.slice(0, 400)}...`}</p>
        </div>
      </div>
    </Link>
  );
}
export default withRouter(connect(Main));
