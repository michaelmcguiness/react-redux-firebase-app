import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ScreamSkeleton";

// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

function User(props) {
  const { screams, loading } = props.data;

  const [state, setState] = useState({
    profile: null,
    screamIdParam: null
  });

  useEffect(() => {
    const handle = props.match.params.handle;
    const screamId = props.match.params.screamId;

    if (screamId) setState({ ...state, screamIdParam: screamId });

    props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }, []);

  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    <p> No screams from this user</p>
  ) : !state.screamIdParam ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map(scream => {
      if (scream.screamId !== state.screamIdParam)
        return <Scream key={scream.screamId} scream={scream} />;
      else
        return (
          <Scream key={scream.screamId} scream={scream} openDialog={true} />
        );
    })
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {state.profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={state.profile} />
        )}
      </Grid>
    </Grid>
  );
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(User);
