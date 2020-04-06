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

  {
    id: shortid.generate(),
    name: "Bob",
    bio: "I like turtles",
  },
];

// middle ware to parse JSON
server.use(express.json());

// setting up endpoints

// checks if server is running right
server.get("/", (req, res) => {
  res.json({ api: "is running right" });
});

// gets users array and has error message incase something goes wrong
server.get("/api/users", (req, res) => {
  if (users) {
    res.json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

// gets user via specific id
server.get("/api/users/:id", (req, res) => {
  const userID = req.params.id;
  const user = users.find((person) => person.id == userID);

  if (user) {
    res.json(user);
  } else if (user) {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved." });
  } else {
    res
      .status(404)
      .json({ errorMessage: "The user with the specified ID does not exist." });
  }
});

// adding a new user
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(201)
      .json({ errorMessage: "Please provide a name and bio for the user" });
  } else if (newUser) {
    users.push(newUser);
    res.status(201).json(users);
  } else {
    res
      .status(500)
      .json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
  }
});

// server listening on localhost 5000
const port = 5000;
server.listen(port, () =>
  console.log(`\n===Api is running on port {port}===\n`)
);
