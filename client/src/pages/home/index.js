import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../config";

function Main(props) {
  return (
    <div>
      <hr />
      <div className="box">
        <h2>Standing in Solidarity with Black Lives Matter</h2>

        <p>
          Ebenee is devoted to helping connect recruiters to job seekers among the black and minority communities around
          the world to help lift those out of poverty to help repair fractured lives and restore lost communities.
        </p>
      </div>

      <img src={`${process.env.REACT_APP_API}/images/bonfire.gif`} />

      <div className="box">
        <h2>Join our community and connect with companies looking to help bring job seekers back into society.</h2>

        <p>Create a profile, upload a resume and talk to recruiters looking to hire talent just like you.</p>
      </div>

      <Link to={`${routes.Register}`}>
        <button>Get Started</button>
      </Link>
    </div>
  );
}
export default Main;
