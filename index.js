const e = require("express");
const express = require("express");
const shortid = require("shortid");

let users = [];

const server = express();

server.use(express.json());

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

server.get("/", (req, res) => {
  res.json("Users node api1 project");
});

//create
server.post("/api/users", (req, res) => {
  const usersInfo = req.body;
  if (!usersInfo.name || !usersInfo.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else if (usersInfo) {
    usersInfo.id = shortid.generate();
    users.push(usersInfo);
    res.status(201).json(usersInfo);
  } else {
    res.status(500).json({
      errorMessage: "There was an error saving the user to the database",
    });
  }
});

//read
server.get("/api/users", (req, res) => {
  if (!users) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved" });
  } else {
    res.status(200).json(users);
  }
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const findUserbyId = users.find((user) => user.id === id);

  if (!findUserbyId) {
    res
      .status(404)
      .json({ message: "The user with the specidifed ID does not exist" });
  } else if (findUserbyId) {
    res.status(200).json(findUserbyId);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved" });
  }
});

//update

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  let index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    changes.id = id;
    users[index] = changes;
    res.status(200).json(changes);
  } else {
    res
      .status(404)
      .json({ message: `The user information could not be motified` });
  }
});

//delete

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const deleted = users.find((user) => user.id === id);
  if (deleted) {
    users = users.filter((user) => user.id !== id);
    res.status(200).json(deleted);
    console.log(deleted);
  } else {
    res.status(404).json({ message: "id is not found" });
  }
});
