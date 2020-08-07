import React from "react";
import { routes, api } from "../../config";

function Main(props) {
  function searchJobs() {
    const form = document.getElementById("searchOne");
    const data = { search_query: form.search_query.value };
    if (data.search_query.length === 0) {
      return;
    }
    window.location.href = `${routes.JobProfileSearch}/0/${data.search_query}`;
  }

  function searchProfiles() {
    const form = document.getElementById("searchOne");
    const data = { search_query: form.search_query.value };
    if (data.search_query.length === 0) {
      return;
    }
    window.location.href = `${routes.UserProfileSearch}/0/${data.search_query}`;
  }

  return (
    <div>
      <form id="searchOne">
        <input style={{ display: "inline" }} type="text" name="search_query" placeholder="Search" />
        <input style={{ display: "inline" }} onClick={searchJobs} type="button" value="Jobs" />
        <input style={{ display: "inline" }} onClick={searchProfiles} type="button" value="Profiles" />
      </form>
    </div>
  );
}
export default Main;
