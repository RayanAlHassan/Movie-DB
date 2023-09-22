const express = require("express"); // get express package
const app = express(); // to make l app work with express

app.get("/", (req, res) => {
  res.send("OK");
  console.log("here");
});

app.listen(3000, () => {
  console.log("run server");
}); // give the port that we gonna opent in and  make function to test if server open
