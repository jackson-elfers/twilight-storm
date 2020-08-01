import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import check from "check-types";
import { routes, api } from "../../config";
import { connect } from "../../redux";

function Main(props) {
  const [search, setSearch] = useState({});
  const [loading, setLoading] = useState(true);

  async function getSearch(e) {
    e.preventDefault();
    const form = document.getElementById("formOne");
    const data = { index: props.match.params.index, search_query: form.search_query.value };
    try {
      props.history.push(`${props.UserProfileSearch}/${data.index}/${32}/${data.search_query}`);
    } catch (e) {
      props.actions.notice.message(e.message);
    }
  }

  async function loadSearch() {
    const response = await axios.get(
      `${process.env.REACT_APP_API}${api.user_profile.search}/${props.match.params.index}/${props.match.params.search_query}`
    );
    if (response.data.error) {
      throw new Error(response.data.error.detail);
    } else if (response.data.data.length === 0) {
      throw new Error("No profiles match that search...");
    }
    setSearch(response.data.data[0]);
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

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      <h1>Search Profiles</h1>
      <hr />
      <form id="formOne" onSubmit={getSearch}>
        <input type="text" name="search_query" placeholder="search" />
        <input type="submit" value="search" />
      </form>
      {loading ? (
        <div style={{ display: "none" }}></div>
      ) : (
        search
          .map((d, i) => {
            return (
              <div>
                <div className="box">
                  <h3>{`${d.title}`}</h3>
                  <hr />
                  <h2>{`${d.first_name} ${d.last_name}`}</h2>
                  <p>
                    {d.summary.split("\n").map((summaryParagraph, i) => {
                      return <p>{summaryParagraph}</p>;
                    })}
                  </p>
                </div>

                <div className="box">
                  <p>{`Address: ${d.city}, ${d.state}, ${d.street}, ${d.zip}`}</p>
                  <p>{`Phone: ${d.work_phone}`}</p>
                  <p>{`Email: ${d.work_email}`}</p>
                </div>
              </div>
            );
          })
          .join("")
      )}
    </div>
  );
}
export default connect(Main);
