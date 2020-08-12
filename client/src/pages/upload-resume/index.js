import React, { useState, useEffect } from "react";
import axios from "axios";
import check from "check-types";
import { routes, api } from "../../config";
import { connect } from "../../redux";
import mime from "mime-types";

function Main(props) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    const response = await axios.get(
      `${process.env.REACT_APP_API}${api.user_profile.read}/${props.match.params.url_title}`
    );
    if (response.data.error) {
      throw new Error(response.data.error.detail);
    } else if (response.data.data.length === 0) {
      throw new Error("This profile doesn't exist...");
    }
    setProfile(response.data.data[0]);
  }

  async function upload(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    try {
      const file_meta = {
        parent_id: profile._id,
        file_name: form.upload.files[0].name
      };
      if (mime.lookup(file_meta.file_name) !== "application/pdf") {
        throw new Error("Resume must be of type pdf.");
      }
      const headers = { "Content-Type": "application/octet-stream", file_meta: JSON.stringify(file_meta) };
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API}${api.file.uploadResume}`,
        form.upload.files.item(0),
        { headers: headers }
      );
      setLoading(false);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
    } catch (error) {
      props.actions.notice.message(error.message);
      setLoading(false);
    }
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
      <h1>Upload Resume</h1>
      <hr />
      <form id="formOne" onSubmit={upload}>
        <input type="file" name="upload" />
        <input type="submit" value="upload" />
      </form>
    </div>
  );
}
export default connect(Main);
