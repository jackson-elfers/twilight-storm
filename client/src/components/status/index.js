import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { routes, api } from "../../config";
import { connect } from "../../redux";
import axios from "axios";

const nav = { float: "right", backgroundColor: "rgba(0, 0, 0, 0)", padding: "2px" };

const Profile = connect(function(props) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    const response = await axios.get(
      `${process.env.REACT_APP_API}${api.user_profile.resolve}/${props.globals.user.info._id}`
    );
    if (response.data.error) {
      throw new Error(response.data.error.detail);
    } else if (response.data.data.length === 0) {
      return;
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
    <Link to={`${routes.UserProfile}/${profile.url_title}`}>
      <button style={nav}>{`${props.globals.user.info.email.slice(0, 4)}'s profile`}</button>
    </Link>
  );
});

function Nav(props) {
  if (props.user) {
    return (
      <div>
        <div>
          <Link to={routes.Menu}>
            <button style={nav}>menu</button>
          </Link>
          <Profile />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Link to={routes.Menu}>
          <button style={nav}>menu</button>
        </Link>
        <Link to={routes.Register}>
          <button style={nav}>register</button>
        </Link>
        <Link to={routes.Login}>
          <button style={nav}>login</button>
        </Link>
      </div>
    );
  }
}

class Main extends React.Component {
  async componentDidMount() {
    await this.props.actions.user.set();
  }

  render() {
    return (
      <div>
        <Link to={routes.Home}>
          <h1>Ebenee</h1>
        </Link>
        <div style={{ height: "50px" }}>
          <Nav user={this.props.globals.user.info} />
        </div>
      </div>
    );
  }
}

export default connect(Main);
