import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../config";
import { connect } from "../../redux";

function Nav(props) {
  const nav = { float: "right", backgroundColor: "rgba(0, 0, 0, 0)", padding: "2px" };
  if (props.user) {
    return (
      <div>
        <Link to={routes.Menu}>
          <button style={nav}>menu</button>
        </Link>
        <Link to={routes.Dashboard}>
          <button style={nav}>{`hi ${props.user.email.slice(0, 12)}...`}</button>
        </Link>
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
          <h1>Boilerplate</h1>
        </Link>
        <div style={{ height: "50px" }}>
          <Nav user={this.props.globals.user.info} />
        </div>
      </div>
    );
  }
}

export default connect(Main);
