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
// writes the new note to the json file
app.post("/api/notes", function(req, res) {
    try {
      // reads the json file
      notes = fs.readFileSync("db/db.json", "utf8");
      console.log(notes);
  
      // parse the data to get an array of objects
      notes = JSON.parse(notes);
      // set new notes id
      req.body.id = notes.length;
      // add the new note to the array of note objects
      notes.push(req.body); 
      // make it string(stringify)so you can write it to the file
      notes = JSON.stringify(notes);
      // writes the new note to file
      fs.writeFile("db/db.json", notes, "utf8", function(err) {
        // error handling
        if (err) throw err;
      });
      // sending response to the browser(client)
      res.json(JSON.parse(notes));
  
      // error Handling
    } catch (err) {
      throw err;
      console.error(err);
    }
  });
  
  //  To delete a note
  app.delete("/api/notes/:id", function(req, res) {
    try {
      //  reads the json file
      notes = fs.readFileSync("db/db.json", "utf8");
      // parse the data to get an array of the objects
      notes = JSON.parse(notes);
      // delete the old note from the array on note objects
      notes = notes.filter(function(note) {
        return note.id != req.params.id;
      });
      // make it string(stringify)so you can write it to the file
      notes= JSON.stringify(notes);
      // write the new notes to the file
      fs.writeFile("db/db.json", notes, "utf8", function(err) {
        // error handling
        if (err) throw err;
      });
  
      // change it back to an array of objects & send it back to the browser (client)
      res.send(JSON.parse(notes));
  
      // error handling
    } catch (err) {
      throw err;
    }
  });
  
  
  // Web page when the Get started button is clicked
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  
  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
  
  app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "db/db.json"));
  });
  

// Start the server on the port
app.listen(PORT, function() {
  console.log(`SERVER IS LISTENING: ${PORT}`);
});