/*
Just for reference
*/

/*
likeCount and commentCount are good practice: don't want to check 
and count the comments of each scream because firebase charges you on 
the number of reads you do.  Try to minimize number of reads each time 
user sends a request
*/
let db = {
  screams: [
    {
      userHandle: "user",
      body: "this is a sample scream",
      createdAt: "2020-01-16T21:13:53.073Z",
      likeCount: 5,
      commentCount: 2
    }
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "kljfsdkjdfsklkjld",
      body: "nice one mate!",
      createdAt: "2020-01-17T13:28:49.421Z"
    }
  ],
  notifications: [
    {
      recipient: "user",
      sender: "john",
      read: "true | false",
      screamId: "kljfsdsdjklfjksdlfkjl",
      type: "like | comment",
      createdAt: "2020-01-17T13:28:49.421Z"
    }
  ]
};

const userDetails = {
  // Redux data
  credentials: {
    bio: "Hello, I'm user",
    createdAt: "2020-01-17T13:28:49.421Z",
    email: "new2@email.com",
    handle: "new2",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialape-e5b71.appspot.com/o/96121351390.png?alt=media",
    location: "Los Angeles, CA",
    userId: "SghdjGDZr7MhGX9cK7VqZoyfzrt1",
    website: "https://google.com"
  },
  likes: [
    {
      userHandle: "user",
      screamId: "IYEhE0O37Q5CruyYUHwp"
    },
    {
      userHandle: "user",
      screamId: "IYEhE0O37Q5CruyYUHwp"
    }
  ]
};
