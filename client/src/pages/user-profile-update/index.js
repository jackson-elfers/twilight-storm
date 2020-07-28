import React from "react";
import axios from "axios";
import check from "check-types";
import { routes, api } from "../../config";
import { connect } from "../../redux";

function Main(props) {
  async function update(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = {
      _id: "",
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      city: form.city.value,
      state: form.state.value,
      street: form.street.value,
      zip: form.zip.value,
      work_phone: form.work_phone.value,
      work_email: form.work_email.value,
      title: form.title.value,
      summary: form.summary.value,
      keywords: form.keywords.value
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}${api.user_profile.update}`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      props.history.push(routes.UserProfile);
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  return (
    <div>
      <h1>User Profile</h1>
      <hr />
      <form id="formOne" onSubmit={update}>
        <input type="text" name="first_name" placeholder="First Name" />
        <input type="text" name="last_name" placeholder="Last Name" />
        <input type="text" name="city" placeholder="City" />
        <input type="text" name="state" placeholder="State" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="zip" placeholder="Zip" />
        <input type="text" name="work_phone" placeholder="Work Phone" />
        <input type="text" name="work_email" placeholder="Work Email" />
        <input type="text" name="title" placeholder="Title" />
        <textarea name="summary" placeholder="Summary" />
        <input type="submit" value="update" />
      </form>
    </div>
  );
}
export default connect(Main);
