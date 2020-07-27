import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import "./styles";
import {
  Home,
  ResolvedDate,
  Menu,
  Account,
  Login,
  Logout,
  Register,
  UpdateEmail,
  UpdatePassword,
  Unregister,
  NotFound,
  Profile,
  UpdateProfile,
  UploadResume,
  JobCreate,
  JobUpdate,
  JobDelete,
  SearchProfile,
  SearchJob
} from "./pages";
import { Status, Scroll, SetUser, Notice } from "./components";
import { routes } from "./config";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Provider store={store}>
    <Router>
      <SetUser />
      <Scroll>
        <Status />
        <Notice>
          <Switch>
            <Route exact path={routes.Home} component={Home} />
            <Route exact path={routes.Menu} component={Menu} />
            <Route exact path={routes.Account} component={Account} />
            <Route exact path={routes.Login} component={Login} />
            <Route exact path={routes.Logout} component={Logout} />
            <Route exact path={routes.Register} component={Register} />
            <Route exact path={routes.UpdateEmail} component={UpdateEmail} />
            <Route exact path={routes.UpdatePassword} component={UpdatePassword} />
            <Route exact path={routes.Unregister} component={Unregister} />
            <Route exact path={`${routes.UserProfile}/:url_title`} component={UserProfile} />
            <Route exact path={`${routes.UserProfileUpdate}/:url_title`} component={UserProfileUpdate} />
            <Route exact path={`${routes.UserProfileSearch}/:index/:search_query`} component={UserProfileSearch} />
            <Route exact path={`${routes.UploadResume}/:url_title`} component={UploadResume} />
            <Route exact path={`${routes.JobProfile}/:url_title`} component={JobProfile} />
            <Route exact path={`${routes.JobProfileCreate}`} component={JobProfileCreate} />
            <Route exact path={`${routes.JobProfileUpdate}/:url_title`} component={JobProfileUpdate} />
            <Route exact path={`${routes.JobProfileDelete}/:url_title`} component={JobProfileDelete} />
            <Route exact path={`${routes.JobProfileSearch}/:index/:search_query`} component={JobProfileSearch} />
            <Route component={NotFound} />
          </Switch>
        </Notice>
      </Scroll>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
