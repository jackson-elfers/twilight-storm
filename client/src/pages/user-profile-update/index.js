import React, { useState, useEffect } from "react";
import axios from "axios";
import check from "check-types";
import { routes, api } from "../../config";
import { connect } from "../../redux";

function Main(props) {
  const [profile, setProfile] = useState({});

  async function update(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = {
      _id: profile._id,
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
      const response = await axios.put(`${process.env.REACT_APP_API}${api.user_profile.update}`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      window.location.href = `${routes.UserProfile}/${response.data.data.url_title}`;
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  async function loadUserProfile() {
    const response = await axios.get(
      `${process.env.REACT_APP_API}${api.user_profile.read}/${props.match.params.url_title}`
    );
    if (response.data.error) {
      throw new Error(response.data.error.detail);
    } else if (response.data.data.length === 0) {
      throw new Error("This profile doesn't exist...");
    }
    setProfile(response.data.data[0]);
    const form = document.getElementById("formOne");
    form.first_name.value = response.data.data[0].first_name;
    form.last_name.value = response.data.data[0].last_name;
    form.city.value = response.data.data[0].city;
    form.state.value = response.data.data[0].state;
    form.street.value = response.data.data[0].street;
    form.zip.value = response.data.data[0].zip;
    form.work_phone.value = response.data.data[0].work_phone;
    form.work_email.value = response.data.data[0].work_email;
    form.title.value = response.data.data[0].title;
    form.summary.value = response.data.data[0].summary;
    form.keywords.value = response.data.data[0].keywords;
  }

  async function load() {
    try {
      await loadUserProfile();
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

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
        <input type="text" name="keywords" placeholder="Keywords" />
        <input type="submit" value="update" />
      </form>
    </div>
  );
}
export default connect(Main);
