// need express to interact with the front end
const express = require("express");
// need path for filename paths
const path = require("path");
// need fs to read and write to files
const fs = require("fs");

// initiating express
const app = express();
// port for listeners
const PORT = process.env.PORT || 8080;

//  Initialize notes array
let notes = [];

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// api call response for all the notes, and sends the results to the browser as an array of object
app.get("/api/notes", function(err, res) {
  try {
    // reads the notes from json file
    notes = fs.readFileSync("db/db.json", "utf8");
    console.log("success!");
    // parse it so notes is an array of objects
    notes = JSON.parse(notes);

    // error handling
  } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.log(err);
  }
  //   send objects to the browser
  res.json(notes);
});


// Start the server on the port
app.listen(PORT, function() {
  console.log(`SERVER IS LISTENING: ${PORT}`);
});