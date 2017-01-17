// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

//var friendList = require("../data/friends.js");
var friendList = { table: [] };
var fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

  function fileWrite(err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("friend list updated");
    }
  }

  app.post("/api/choices", function (req, res) {

    var file = 'app/data/friends.json';
    fs.readFile(file, 'utf8', function (err, obj) {
      if (err) { 
        console.log(err); 
      }
      else {
        friendList = JSON.parse(obj);

        var friendmatch;
        var minScore = 999;
        var score = 0;

        if (req.body.preferences && req.body.preferences.length != 10) {
          console.log("preferences cannot be undefined");
          return res.json(false);
        }
        for (var i = 0; i < friendList.length; i++) {
          if (friendList[i].name != req.body.name) {
            // calculate score
            score = 0;
            console.log("Comparing " + req.body.name + " with " + friendList[i].name);
            for (var j = 0; j < friendList[i].preferences.length; j++) {
              if (req.body.preferences[j] === "") {
                console.log("preferences cannot be undefined");
                return res.json(false);
              }
              score = score + parseInt(Math.abs(parseInt(friendList[i].preferences[j]) - parseInt(req.body.preferences[j])));
            }
            console.log("calculate score=" + score + " for=" + friendList[i].preferences + " and " + req.body.preferences);

            if (score < minScore) {
              minScore = score;
              friendmatch = friendList[i];
              console.log("score=" + minScore + " match=" + friendmatch)
            }

          }
        }
        friendList.push(req.body);
        fs.writeFile(file, JSON.stringify(friendList), 'utf8', fileWrite);
        res.json(friendmatch);
      }
    });
  });


  app.post("/api/clear", function () {
    // Empty out the arrays of data
    tableData = [];
    waitListData = [];

    console.log(tableData);
  });
}
