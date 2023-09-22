const express = require("express"); // get express package
const app = express(); // to make l app work with express
const today = new Date();

app.get("/", (req, res) => {
  res.send("OKkk");
  console.log("here");
});
app.get("/test", (req, res) => {
  res.status(200).send("ok"); // if we want to send message with status we use .status , but if we want just send status we use .sendStatus
});
app.get("/time", (req, res) => {
  var time = today.getHours() + ":" + today.getMinutes();
  res.status(200).send(time);
});
app.listen(3000, () => {
  console.log("run server");
}); // give the port that we gonna opent in and  make function to test if server open
