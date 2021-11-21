const express = require("express");
const fs = require("fs");
const path = require("path");
const { parse } = require("path/posix");
const { clog } = require("./middleware/clog");

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

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) =>
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    var parsedString = JSON.parse(data);
    res.json(parsedString);
  })
);
// fs.readFile('data.csv', 'utf8', (error, data) => error ? console.error(error) : console.log(data)
// );

// Uncomment this next function to write to the file with anything you pass in as process.argv[2]
// const userInput = process.argv[2]
// console.log(userInput)
// fs.writeFile('log.txt', process.argv[2], (err) =>
//   err ? console.error(err) : console.log('Success!')
// );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
