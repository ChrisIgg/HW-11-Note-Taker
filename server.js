const { config } = require("dotenv");
const express = require("express");
const fs = require("fs");
const path = require("path");
const helpers = require("./utils/helpers.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("./notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) =>
  // utf8 is encoding (english characters), err if errors, now what is data
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    console.log(data, "data before res.json");
    if (err) {
      console.error(err);
      return;
    }
    res.json(JSON.parse(data));
  })
);

app.post("/api/notes", async (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    helpers(newNote);
    res.json(`Note added successfully 🚀`);
    console.log("We reach this point");
  } else {
    res.error("Error in adding note");
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
