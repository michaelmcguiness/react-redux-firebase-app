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

// Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.spreadIt
});

function Login({ classes, history, UI: { loading } }) {
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {}
  });

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: state.email,
      password: state.password
    };
    loginUser(userData, history);
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
            Login
            {state.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Don't have an account? Sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Login.protoTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
