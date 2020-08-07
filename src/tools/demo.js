const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const utils = require("../utils");
const controllers = require("../controllers");
const shortid = require("shortid");
var random = require("random-name");
utils.db.connect();

async function demo() {
  const email = `jacksonelfersdemo${shortid.generate()}@outlook.com`;
  const responseOne = await controllers.user.register({ email: email, password: "88888888" });
  const responseTwo = await controllers.user_profile.read({ url_title: responseOne.info.url_title });

  const response = await controllers.user.login({ email: email, password: "88888888" });
  const data = await utils.jwt.decode(response.jwt);
  await controllers.user_profile.update({
    _id: responseTwo.results[0]._id,
    owner_id: data._id,
    first_name: random.first(),
    last_name: random.last(),
    city: "Colfax",
    state: "WA",
    street: "1717 N. Oak St.",
    zip: "99111",
    work_phone: "5092880920",
    work_email: "jacksonelfersjobs@outlook.com",
    title: "Software Engineer",
    summary: `I enjoy a good cup of tea, contributing to open source (GitHub) and building cloud based solutions. I'm from eastern Washington, enjoy life on and off the computer, spend time with my folks, watch Star Trek and football (Go Cougs!) with my old man and care for our two fur babies (chihuahuas), Quincy and Taco. I have experience working in and around utility scale wind turbines. I feel blessed in many ways.

I am a student of many things, and I hope to support my local community and the broader society with many small but mighty contributions.

Find me on github - https://github.com/jackson-elfers
Check out the Portfolio - https://jackson-elfers.github.io/`,
    keywords: "nodejs reactjs express socketio"
  });
  await controllers.job_profile.create({
    owner_id: data._id,
    first_name: random.first(),
    last_name: random.last(),
    city: "Colfax",
    state: "WA",
    street: "1717 N. Oak St.",
    zip: "99111",
    work_phone: "5092880920",
    work_email: "jacksonelfersjobs@outlook.com",
    title: "Software Engineer",
    summary: `We are looking for an experienced full-stack software developer. This position will be located in our Charlotte or Denver office. The ideal candidate will be able to be comfortable working in both the consulting side and our fast-growing SaaS product business. Other responsibilities may arise as needed.


Our stack is mainly Ruby on Rails and some Golang on the backend, and React on the front end. On the consulting side, we touch everything from Javascript, Java, .NET, Node, SQL, or whatever else comes our way.`,
    keywords: "nodejs reactjs express socketio"
  });
}

async function initialize() {
  for (var i = 0; i < 30; ++i) {
    await demo();
    console.log("user " + i + " created");
  }
}

initialize()
  .then(() => {
    process.exit();
  })
  .catch(e => {
    console.log(e);
  });
