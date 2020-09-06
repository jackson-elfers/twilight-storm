import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { routes, api } from "../../config";
import { connect } from "../../redux";
import { Profile } from "../../components";

function Main(props) {
  const [profile, setProfile] = useState({});
  const [files, setFiles] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    // load profile
    const responseOne = await axios.get(
      `${process.env.REACT_APP_API}${api.user_profile.read}/${props.match.params.url_title}`
    );
    if (responseOne.data.error) {
      throw new Error(responseOne.data.error.detail);
    } else if (responseOne.data.data.length === 0) {
      throw new Error("This profile doesn't exist...");
    }
    setProfile(responseOne.data.data[0]);

    // load files
    const responseTwo = await axios.get(
      `${process.env.REACT_APP_API}${api.file.readByParentId}/${responseOne.data.data[0]._id}`
    );
    if (responseTwo.data.error) {
      throw new Error(responseTwo.data.error.detail);
    }
    setFiles(responseTwo.data.data);

    // check admin
    const responseThree = await axios.get(`${process.env.REACT_APP_API}${api.admin.validate}`);
    if (!responseThree.data.error) {
      setAdmin(true);
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

  async function adminLogin() {
    const data = {
      _id: profile.owner_id
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}${api.admin.login}`, data);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      await props.actions.user.set();
      window.location.reload();
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  async function deleteFile(e) {
    const storage_name = e.target.getAttribute("data-storage_name");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}${api.file.remove}/${storage_name}`);
      if (response.data.error) {
        throw new Error(response.data.error.detail);
      }
      await loadProfile();
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      {admin ? (
        <div className="box">
          <button onClick={adminLogin}>Login</button>
        </div>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
      {props.globals.user.info && props.globals.user.info._id === profile.owner_id ? (
        <div className="box">
          <Link to={`${routes.UserProfileUpdate}/${props.match.params.url_title}`}>
            <button>Edit Profile</button>
          </Link>
          <Link to={`${routes.UploadResume}/${props.match.params.url_title}`}>
            <button>Add Resume</button>
          </Link>
          <Link to={`${routes.JobProfileCreate}`}>
            <button>Create Job</button>
          </Link>
          <Link to={`${routes.JobProfileList}`}>
            <button>Job List</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
      <h1>User Profile</h1>
      <hr />
      <Profile profile={profile} />
      <div className="box">
        <h3>Resumes</h3>
        <hr />
        {files.map((d, i) => {
          return (
            <p key={d.storage_name}>
              <a target="_blank" href={`${process.env.REACT_APP_API}${api.file.readByStorageName}/${d.storage_name}`}>
                {d.file_name}
              </a>{" "}
              {props.globals.user.info && props.globals.user.info._id === profile.owner_id ? (
                <span style={{ cursor: "pointer" }} data-storage_name={d.storage_name} onClick={deleteFile}>
                  🗑
                </span>
              ) : (
                <div style={{ display: "none" }}></div>
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}
export default connect(Main);
