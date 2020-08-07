import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../config";

function Main(props) {
  return (
    <div>
      <hr />
      <div className="box">
        <p>Hi Betty,</p>
        <p>
          So the site is nearly complete, still need to build a persuasive homepage, admin controls, and upload
          functionality for user profiles. Take a look around and let me know of anything you'd like to add. You can
          call/text/email whenever you'd like. You have a bunch of fake users for demo purposes search for "software
          engineer" and you'll hit about 30 of them.
        </p>
        <p>
          Does this style/color work for you? We can change everything if you'd like. I'm looking forward to building
          this into android/ios apps along with maybe pwa so we'll have maximum coverage on all platforms. I might hire
          a copywriter to help with the actual site design I know a good one LinkedIn. Anyhow, things are going well,
          test drive it and let me know!
        </p>
      </div>
      <img src={`${process.env.REACT_APP_API}/images/bonfire.gif`} />
    </div>
  );
}
export default Main;
