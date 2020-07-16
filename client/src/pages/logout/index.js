import React from "react";
import axios from "axios";
import check from "check-types";
import { routes, api } from "../../config";
import { connect } from "../../redux";

function Main(props) {
  async function logout(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}${api.user.logout}`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      props.actions.user.clear();
      props.history.push(routes.Home);
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  return (
    <div>
      <h1>Logout</h1>
      <hr />
      <p>Goodbye, hope to see you again soon!</p>
      <form id="formOne" onSubmit={logout}>
        <input type="submit" value="logout" />
      </form>
    </div>
  );
}
export default connect(Main);
