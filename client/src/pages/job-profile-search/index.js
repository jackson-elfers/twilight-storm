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

  async function getSearch(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = { search_query: form.search_query.value };
    try {
      window.location.href = `${routes.JobProfileSearch}/0/${data.search_query}`;
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  async function loadSearch() {
    const form = document.getElementById("formOne");
    form.search_query.value = props.match.params.search_query;
    const response = await axios.get(
      `${process.env.REACT_APP_API}${api.job_profile.search}/${props.match.params.index}/32/${props.match.params.search_query}`
    );
    if (response.data.error) {
      throw new Error(response.data.error.detail);
    }
    setSearch(response.data.data);

    if (response.data.data.length === 0) {
      throw new Error("No profiles match that search...");
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
      <h1>Search Job Profiles</h1>
      <hr />
      {Number(props.match.params.index) === 0 ? (
        <div style={{ display: "none" }}></div>
      ) : (
        <a
          href={`${routes.JobProfileSearch}/${Number(props.match.params.index) - 1}/${props.match.params.search_query}`}
        >
          <button>previous</button>
        </a>
      )}
      <form id="formOne" onSubmit={getSearch}>
        <input style={{ display: "inline" }} type="text" name="search_query" placeholder="search" />
        <input style={{ display: "inline" }} type="submit" value="Search" />
      </form>
      {loading ? (
        <div style={{ display: "none" }}></div>
      ) : (
        search.map((d, i) => {
          return <Search key={`${d.title} - ${d.summary}`} profile={d} link={`${routes.JobProfile}/${d.url_title}`} />;
        })
      )}
      <a href={`${routes.JobProfileSearch}/${Number(props.match.params.index) + 1}/${props.match.params.search_query}`}>
        <button>next</button>
      </a>
    </div>
  );
}
export default connect(Main);
