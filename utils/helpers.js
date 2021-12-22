const fs = require("fs");
const { resolve } = require("path");

async function readAndAppend(newNote) {
  return new Promise((resolve) => {
    let data = fs.readFileSync("./db/db.json", { encoding: "utf-8" });
    data = JSON.parse(data);
    data.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(data, null, 2), (err) => {
      if (err) throw err;
      resolve();
    });
  });
}

module.exports = readAndAppend;
