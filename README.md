# Full Stack React & Firebase App

- fully-featured social media application using React, Firebase, Redux, Express, and Material-UI
  - Creates a backend REST API server with Node.js and Express, user login and authentication, image uploads, notifications, cloud functions, deploying to Firebase and more.
  - Uses Cloude Firestore as real-time noSQL database, Cloud Functions, Authentication, and cloud storage.
  - Material-UI one of the best (if not the best) react implementations of Google's Material design standards
- source: https://www.youtube.com/watch?v=m_u6P5k0vP0

## Firebase

- firebase.google.com -> go to console -> create a project
- > npm install -g firebase-tools
- > firebase login
- > mkdir socialape-functions (cd into it)
- > firebase init (may need to set > alias firebase="/Users/michaelmcguiness/.npm-global/bin/firebase")
- select "Functions: Configure and deploy Cloud Functions" for Firebase CLI features
- select existing project (socialape-e5b71 (socialape))
- select JavaScript. No to ESLint. Yes to installing dependencies.
- run "firebase deploy" in CLI and test hello world endpoint with insomnia
- Now initialize the database (pull up project on Firebase in browser, and go to "Database" under "Develop")
- Create Database (start in test mode)
- Add first collection, which will hold our posts
- Initialize the SDK = generate a private key file for your service account then set environment variable: export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
