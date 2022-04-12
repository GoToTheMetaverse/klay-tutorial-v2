const express = require("express");
const { port } = require("./config.json");

// rediect url
// http://localhost:53134
// https://discord.com/api/oauth2/authorize?client_id=963338592489472010&redirect_uri=http%3A%2F%2Flocalhost%3A53134&response_type=code&scope=identify

const app = express();

app.get("/", (request, response) => {
  return response.sendFile("index.html", { root: "." });
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
