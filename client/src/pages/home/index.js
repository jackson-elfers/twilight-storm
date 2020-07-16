import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../config";

function Main(props) {
  return (
    <div>
      <h1>Home</h1>
      <hr />
      <img src={`${process.env.REACT_APP_API}/images/bonfire.gif`} />
    </div>
  );
}
export default Main;
