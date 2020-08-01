import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { routes, api } from "../../config";
import { connect } from "../../redux";

function Main(props) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

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
  }

  async function load() {
    try {
      await loadUserProfile();
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
      {props.globals.user.info._id === profile.owner_id ? (
        <Link to={`${routes.UserProfileUpdate}/${props.match.params.url_title}`}>
          <button>Edit</button>
        </Link>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
      <h1>User Profile</h1>
      <hr />

      <div className="box">
        <h3>{`${profile.title}`}</h3>
        <hr />
        <h2>{`${profile.first_name} ${profile.last_name}`}</h2>
        {profile.summary.split("\n").map((summaryParagraph, i) => {
          return <p>{summaryParagraph}</p>;
        })}
      </div>

      <div className="box">
        <p>{`Address: ${profile.city}, ${profile.state}, ${profile.street}, ${profile.zip}`}</p>
        <p>{`Phone: ${profile.work_phone}`}</p>
        <p>{`Email: ${profile.work_email}`}</p>
      </div>
    </div>
  );
}
export default connect(Main);
