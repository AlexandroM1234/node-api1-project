const express = require("express");

const server = express();

const shortid = require("shortid");

// console.log(shortid.generate());

let users = [
  {
    id: shortid.generate(),
    name: "Alex",
    bio: "I code and thats pretty much it",
  },
];

// middle ware to parse JSON
server.use(express.json());

// setting up endpoints

server.get("/", (req, res) => {
  res.json({ api: "is running right" });
});

// server listening on localhost 5000
const port = 5000;
server.listen(port, () =>
  console.log(`\n===Api is running on port {port}===\n`)
);
