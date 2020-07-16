import User from "./user.error";

import * as config from "../config";

const method = { config: config };

export default {
  user: new User({ method: method })
};
