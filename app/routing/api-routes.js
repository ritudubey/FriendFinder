// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendList = require("../data/friends.js");
var fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  // app.get("/api/friend", function(req, res) {
  //   //algorithm to find the best match
  //   var friendmatch;
  //   var minScore;
  //   var self = req.params.name;
  //   for(var i=0; i< friendList.length; i++) {
  //     if (friendList[i].name != self) {
  //       // calculate score
  //     }
  //   }
  //   res.json(friendmatch);
  // });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate Javascript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------



function fileWrite(err){
  if(err) {
    return console.log(err);
  }else {
    console.log("friend list updated");
  }
}


  app.post("/api/choices", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    var body = 
  {
    name: "dummy",
    pic: "dummy.jpg",
    preferences: ['3', '2', '5', '3' , '1', '1', '2', '5', '3' , '1']
  };

      fs.readFile('friends.txt', function(err, data){
            if(err) console.log(err);
            console.log(data);
        });

      var friendmatch;
      var minScore = 999;
      var score;
    for(var i=0; i< friendList.length; i++) {
      if (friendList[i].name != body.name) {
        // calculate score
        console.log("Comparing " + body.name + " with " + friendList[i].name);
        for(var j=0 ; j< friendList[i].preferences.length; j++) {
          if(body.preferences[j] === undefined) {
            console.log("preferences cannot be undefined");
            res.json(false);
          }else{
          score += Math.abs(friendList[i].preferences[j] - body.preferences[j]);
        }
        }
         console.log("calculate score="+score+" for="+friendList[i].preferences + " and "+ req.body.preferences);
       
        if (score < minScore){
          minScore = score;
          friendmatch = friendList[i];
          console.log("score="+minScore+" match="+friendmatch)
        }

      }
    }
    friendList.push(req.body);
    fs.appendFile("friends.txt", JSON.stringify(eq.body), fileWrite);
  res.json(friendmatch);

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    tableData = [];
    waitListData = [];

    console.log(tableData);
  });
};
