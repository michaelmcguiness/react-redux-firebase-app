import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadIt,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  }
});

function ScreamDialog(props) {
  const {
    classes,
    scream: {
      screamId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
      comments
    },
    UI: { loading }
  } = props;

  const [state, setState] = useState({
    open: false,
    oldPath: "",
    newPath: ""
  });

  useEffect(() => {
    if (props.openDialog) {
      handleOpen();
    }
  }, []);

  const handleOpen = () => {
    let oldPath = window.location.pathname;

    const newPath = `/users/${props.userHandle}/scream/${props.screamId}`;
    window.history.pushState(null, null, newPath);

    if (oldPath === newPath) oldPath = `/users/${props.userHandle}`;

    setState({ open: true, oldPath, newPath });
    props.getScream(props.screamId);
  };

  const handleClose = () => {
    window.history.pushState(null, null, state.oldPath);
    setState({ open: false });
    props.clearErrors();
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <MyButton tip="Comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.DialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
});

const mapActionsToProps = {
  getScream,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
