import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { makeStyles } from "@material-ui/core/styles";

import ResultTable from "./table";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function GithubSearch() {
  const [query, setQuery] = useState({
    search: "",
    topic: "",
    includes: "",
    user: "",
    org: "",
    forks: "0",
    stars: "0",
    language: "",
    sort: "updated",
    order: "asc",
    page: 0,
    per_page: 2,
  });
  // const [isLoading, setLoading] = useState(false);
  const handleChange = (event) => {
    setQuery({ ...query, [event.target.name]: event.target.value });
  };
  const [result, setResult] = useState({});
  const [err, setErr] = useState(null);
  const handleSubmit = async () => {
    try {
      setErr(null);
      const data = await axios.get(process.env.REACT_APP_API_URL + "/search", {
        params: query,
      });
      console.log(data, "this is data");
      setResult(data.data);
    } catch (err) {
      console.log("this is err", err);
      setErr(err.message);
    }
  };

  const classes = useStyles();
  let resultView = (
    <ResultTable
      result={result}
      query={query}
      setQuery={setQuery}
      handleSubmit={handleSubmit}
    />
  );
  if (err) resultView = <Alert severity="error">{err}</Alert>;

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard"
            label="Search"
            defaultValue={query.search}
            onChange={handleChange}
            name="search"
          />
          <TextField
            id="standard"
            label="Includes in"
            defaultValue={query.includes}
            onChange={handleChange}
            name="includes"
          />
          <TextField
            id="standard"
            label="From this owner"
            defaultValue={query.user}
            onChange={handleChange}
            name="user"
          />
          <TextField
            id="standard"
            label="In this organization"
            defaultValue={query.org}
            onChange={handleChange}
            name="org"
          />
          <TextField
            id="standard"
            label="With more than this many forks"
            defaultValue={query.forks}
            onChange={handleChange}
            name="forks"
          />
          <TextField
            id="standard"
            label="With more than this many stars"
            defaultValue={query.stars}
            onChange={handleChange}
            name="stars"
          />
          <TextField
            id="standard"
            label="In language"
            defaultValue={query.language}
            onChange={handleChange}
            name="language"
          />
        </div>
      </form>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Search
      </Button>
      <div> {resultView}</div>
    </div>
  );
}

export default GithubSearch;
