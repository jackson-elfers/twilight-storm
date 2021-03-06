import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { routes, api } from "../../config";
import { connect } from "../../redux";
import { Profile } from "../../components";

function Main(props) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

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
      {props.globals.user.info && props.globals.user.info._id === profile.owner_id ? (
        <div>
          <Link to={`${routes.JobProfileUpdate}/${props.match.params.url_title}`}>
            <button>Edit</button>
          </Link>
          <Link to={`${routes.JobProfileDelete}/${props.match.params.url_title}`}>
            <button>Delete</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
      <h1>Job Profile</h1>
      <hr />
      <Profile profile={profile} />
    </div>
  );
}
export default connect(Main);
