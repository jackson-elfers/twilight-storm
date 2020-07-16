import React from "react";
import { Menu } from "../../components";
import { routes } from "../../config";
import { connect } from "../../redux";

function Main(props) {
  function menu() {
    return [
      [
        "Home",
        () => {
          props.history.push(routes.Home);
        }
      ],
      [
        "Account",
        () => {
          props.history.push(routes.Account);
        }
      ],
      [
        "Logout",
        () => {
          props.history.push(routes.Logout);
        }
      ]
    ];
  }

  return (
    <div>
      <h1>Menu</h1>
      <hr />
      <Menu data={menu()} />
    </div>
  );
}

export default connect(Main);
