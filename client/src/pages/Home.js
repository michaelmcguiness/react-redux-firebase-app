import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Scream from "../components/Scream";
import Profile from "../components/Profile";

const Home = () => {
  const [state, setState] = useState({
    screams: null
  });
  useEffect(() => {
    axios
      .get("/screams")
      .then(res => {
        setState({
          screams: res.data
        });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {state.screams ? (
          state.screams.map(scream => (
            <Scream key={scream.screamId} scream={scream} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
