// import express from our node_modules
const express = require("express");

// import cors from our node_modules - CORS is a middleware, think of it as a bridge between our client and server
const cors = require("cors");

// run the config method of our dotenv module so we can have access to our environment variables
require("dotenv").config();

// tell the server which port to run on. We can set this in our .env but we don't have to
const PORT = process.env.PORT || 8080;

// instatiating our instance of express - we are calling it app (app is now a GIANT object with all the HTTP methods)
const app = express();

// ACTIVATE CORS - don't forget to put the () after cors
app.use(cors());

// import our json data
const data = require("./games.json");

function findGameByYear(year) {
  return data.filter((game) => game.year == year || !year);
}

// Endpoint for /
// .get() takes two parameters
// the first is the route
// the second is the function to run whenever the route is visited
app.get("/", (request, response) => {
  response.json("You are looking at my root route... how roude!");
});

// Endpoint for /games
// localhost:8080/games?year=1999
app.get("/games", (request, response) => {
  const games = findGameByYear(request.query.year);
  response.json(games);
});

// start the server on our PORT, and give it a console log so we can see its working
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
