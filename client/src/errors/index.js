import User from "./user.error";

import * as config from "../config";
import emailValidator from "email-validator";
import check from "check-types";

const method = { config: config, emailValidator: emailValidator, check: check };

export default {
  user: new User({ method: method })
};
