import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { routes, api } from "../../config";
import { connect } from "../../redux";
import { Profile } from "../../components";
import check from "check-types";

function Main(props) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  async function deleteAccount(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    try {
      check.assert(form.deleteme.value === "delete me", "please type 'delete me'");
      const response = await axios.delete(`${process.env.REACT_APP_API}${api.job_profile.remove}/${profile._id}`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      props.history.push(routes.JobProfileList);
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  async function loadProfile() {
    const response = await axios.get(
      `${process.env.REACT_APP_API}${api.job_profile.read}/${props.match.params.url_title}`
    );
    if (response.data.error) {
      throw new Error(response.data.error.detail);
    } else if (response.data.data.length === 0) {
      throw new Error("This profile doesn't exist...");
    }
    setProfile(response.data.data[0]);
  }

  async function load() {
    try {
      await loadProfile();
      setLoading(false);
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      <h1>Remove Profile</h1>
      <hr />
      <p>Are you sure? This profile will be removed...</p>
      <form id="formOne" onSubmit={deleteAccount}>
        <input type="text" name="deleteme" placeholder="delete me" />
        <input type="submit" value="remove profile" />
      </form>
    </div>
  );
}
export default connect(Main);
