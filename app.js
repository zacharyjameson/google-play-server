const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); 

const app = express();

app.use(morgan("common"));
app.use(cors());

const playstore = require("./playstore.js");

app.get("/googleplay", (req, res) => {
  const { sort, genres = "" } = req.query;

  if (sort) {
    if (!["Rating", "App"].includes(sort)) {
      return res.status(400).send("Must sort by either rating or app");
    }
  }

  let results = playstore.filter((game) =>
    game.Genres.toLowerCase().includes(genres.toLowerCase())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0;
    });
  }

  res.json(results);
});

app.listen(8000, () => {
  console.log("Eek! Google is watching us now!");
});
