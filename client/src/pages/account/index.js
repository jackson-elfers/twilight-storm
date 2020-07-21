import React from "react";
import { Menu, LoggedIn } from "../../components";
import { routes } from "../../config";
import { connect } from "../../redux";

function Main(props) {
  function menu() {
    return [
      [
        "Update Email",
        () => {
          props.history.push(routes.UpdateEmail);
        }
      ],
      [
        "Update Password",
        () => {
          props.history.push(routes.UpdatePassword);
        }
      ],
      [
        "Delete Account",
        () => {
          props.history.push(routes.Unregister);
        }
      ]
    ];
  }

  return (
    <div>
      <LoggedIn />
      <h1>Account</h1>
      <hr />
      <Menu data={menu()} />
    </div>
  );
}

export default connect(Main);
