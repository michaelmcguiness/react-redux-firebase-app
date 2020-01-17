const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./utils/fbAuth");

const { getAllScreams, postOneScream } = require("./handlers/screams");
const { signUp, login, uploadImage } = require("./handlers/users");

// Scream Routes
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postOneScream);

// Signup route
app.post("/signup", signUp);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);

exports.api = functions.https.onRequest(app);
