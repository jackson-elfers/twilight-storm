import React, { useState, useEffect } from "react";
import axios from "axios";
import check from "check-types";
import { routes, api } from "../../config";
import { connect } from "../../redux";

function Main(props) {
  async function create(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = {
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
      const response = await axios.put(`${process.env.REACT_APP_API}${api.job_profile.create}`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      props.history.push(`${routes.JobProfile}/${response.data.data.url_title}`);
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  async function load() {
    try {
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>Job Profile</h1>
      <hr />
      <form id="formOne" onSubmit={create}>
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
        <input type="text" name="keywords" placeholder="Keywords" />
        <input type="submit" value="create" />
      </form>
    </div>
  );
}
export default connect(Main);
