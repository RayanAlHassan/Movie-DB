const express = require("express"); // get express package
const app = express(); // to make l app work with express
const today = new Date();

app.get("/", (req, res) => {
  res.send("OKkk");
  console.log("here");
});
app.get("/test", (req, res) => {
  res.status(200).json({ status: 200, message: "ok" }); // if we want to send message with status we use .status , but if we want just send status we use .sendStatus
});
app.get("/time", (req, res) => {
  var time = today.getHours() + ":" + today.getMinutes();
  res.status(200).json({ status: 200, time: time });
});

app.get("/hello/:id?/", (req, res) => {
  let id = req.params.id || "Fadi";
  let statuss = res.status(200);
  res.status(200).json({ status: 200, message: "hello ", id: id });
});
app.get("/search", (req, res) => {
  const search = req.query.s;
  if (search) {
    res.status(200).json({ status: 200, message: "ok", data: search });
  } else
    res.status(500).json({
      status: 500,
      error: true,
      message: "you have to provide a search",
    });
});
app.listen(3000, () => {
  console.log("run server");
}); // give the port that we gonna opent in and  make function to test if server open
