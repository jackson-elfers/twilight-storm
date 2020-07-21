import React from "react";
import axios from "axios";
import check from "check-types";
import { Back, LoggedIn } from "../../components";
import { routes, api } from "../../config";
import errors from "../../errors";
import { connect } from "../../redux";

function Main(props) {
  async function updateEmail(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = { email: form.email.value };
    try {
      await errors.user.updateEmail(data);
      if (
        (await axios.get(`${process.env.REACT_APP_API}${api.user.emailExists}/${data.email}`)).data.data.length !== 0
      ) {
        throw new Error(`${data.email} already exists as a email.`);
      }
      const response = await axios.put(`${process.env.REACT_APP_API}${api.user.updateEmail}`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      form.email.value = "";
      props.actions.notice.message("email updated successfully!");
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  return (
    <div>
      <LoggedIn />
      <Back to={routes.Account} />
      <h1>Update Email</h1>
      <hr />
      <form id="formOne" onSubmit={updateEmail}>
        <input type="text" name="email" placeholder="email" />
        <input type="submit" value="update" />
      </form>
    </div>
  );
}
export default connect(Main);
