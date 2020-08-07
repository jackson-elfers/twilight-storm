import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import check from "check-types";
import { routes, api } from "../../config";
import { connect } from "../../redux";
import { Search } from "../../components";

function Main(props) {
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSearch() {
    const response = await axios.get(`${process.env.REACT_APP_API}${api.job_profile.readByOwnerId}`);
    if (response.data.error) {
      throw new Error(response.data.error.detail);
    }
    setSearch(response.data.data);

    if (response.data.data.length === 0) {
      throw new Error("No job profiles have been added yet...");
    }
  }

  async function load() {
    try {
      await loadSearch();
      setLoading(false);
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>My Job Profiles</h1>
      <hr />
      {loading ? (
        <div style={{ display: "none" }}></div>
      ) : (
        search.map((d, i) => {
          return <Search key={`${d.title} - ${d.summary}`} profile={d} link={`${routes.JobProfile}/${d.url_title}`} />;
        })
      )}
    </div>
  );
}
export default connect(Main);
