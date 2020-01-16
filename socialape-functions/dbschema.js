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
      body: "this is the scream body",
      createdAt: "2020-01-16T21:13:53.073Z",

      likeCount: 5,
      commentCount: 2
    }
  ]
};
