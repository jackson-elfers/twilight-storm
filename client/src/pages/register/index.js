import React, { useState, useEffect } from "react";
import axios from "axios";
import check from "check-types";
import { routes, api } from "../../config";
import errors from "../../errors";
import { connect } from "../../redux";
import ReCaptcha from "react-google-recaptcha";

function Main(props) {
  const [recaptcha, setRecaptcha] = useState(null);

  async function register(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = {
      email: form.email.value,
      password: form.password.value,
      recaptcha_token: recaptcha
    };
    try {
      await errors.user.register(data);
      if (
        (await axios.get(`${process.env.REACT_APP_API}${api.user.emailExists}/${data.email}`)).data.data.length !== 0
      ) {
        throw new Error(`${data.email} already exists as an email.`);
      }
      check.assert(data.password === form.confirm.value, "Please make sure passwords match.");
      check.assert(recaptcha !== null, "Please check, 'I am not a robot'.");
      // register
      const responseOne = await axios.post(`${process.env.REACT_APP_API}${api.user.register}`, data);
      if (responseOne.data.error) {
        throw new Error(responseOne.data.error.detail);
      }
      // login
      const responseTwo = await axios.post(`${process.env.REACT_APP_API}${api.user.login}`, data);
      if (responseTwo.data.error) {
        throw new Error(responseTwo.data.error.detail);
      }
      await props.actions.user.set();
      props.history.push(routes.Account);
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  function reCaptcha(token) {
    setRecaptcha(token);
  }

  function messages() {
    throw new Error(`We're excited you can join our community! After filling out the fields below 
      we can help you get started! 👍`);
  }

  useEffect(() => {
    try {
      messages();
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }, []);

  return (
    <div>
      <h1>Register</h1>
      <hr />
      <form id="formOne" onSubmit={register}>
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="password" name="confirm" placeholder="password confirm" />
        <input type="submit" value="register" />
      </form>
      <ReCaptcha sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={reCaptcha} />
    </div>
  );
}
export default connect(Main);
