import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

import AppIcon from "../images/AppIcon.png";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  ...theme.spreadIt
});

function Signup({ classes, history }) {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    loading: false,
    errors: {}
  });

  const handleSubmit = event => {
    event.preventDefault();
    setState({
      ...state,
      loading: true
    });
    const newUserData = {
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      handle: state.handle
    };
    axios
      .post("/signup", newUserData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        setState({
          ...state,
          loading: false
        });
        history.push("/");
      })
      .catch(err => {
        console.log(err.response.data);
        setState({
          ...state,
          loading: false,
          errors: err.response.data
        });
      });
  };

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={state.errors.email}
            error={state.errors.email ? true : false}
            value={state.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={state.errors.password}
            error={state.errors.password ? true : false}
            value={state.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={state.errors.confirmPassword}
            error={state.errors.confirmPassword ? true : false}
            value={state.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            helperText={state.errors.handle}
            error={state.errors.handle ? true : false}
            value={state.handle}
            onChange={handleChange}
            fullWidth
          />
          {state.errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {state.errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={state.loading}
          >
            Signup
            {state.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? Login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default withStyles(styles)(Signup);
