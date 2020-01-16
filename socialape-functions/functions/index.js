const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./utils/fbAuth");

const { getAllScreams, postOneScream } = require("./handlers/screams");
const { signUp, login } = require("./handlers/users");

// Scream Routes
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postOneScream);

// Signup route
app.post("/signup", signUp);
app.post("/login", login);

exports.api = functions.https.onRequest(app);
