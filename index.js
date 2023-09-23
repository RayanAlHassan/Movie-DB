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

app.get("/movies/create/:id?", (req, res) => {  //id here is optional cz we have ? after the variable also we define a var in the pathe by (:)
  let id = req.params.id || "Fadi";
  let statuss = res.status(200);
  res.status(200).json({ status: 200, message: "hello ", id: id });
});
app.get("/movies/read", (req, res) => {
  // let arrMovie = [];
  // movies.forEach((Element) => {
  //   arrMovie.push(Element.title);
  // });
  res.status(200).json({ status: 200, data: movies });
});

app.get("/movies/update", (req, res) => {
  // http://localhost:3000/movies/update/?r=123  // structure of url who has querry r: is the querry name
  let rate = req.query.r || "Fadi";
  let statuss = res.status(200);
  res.status(200).json({ status: 200, message: "hello ", rate: rate });
});

app.get("/movies/delete", (req, res) => {
  let id = req.params.id || "Fadi";
  let statuss = res.status(200);
  res.status(200).json({ status: 200, message: "hello ", id: id });
});

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  // { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
  { title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
];

app.listen(3000, () => {
  console.log("run server");
}); // give the port that we gonna opent in and  make function to test if server open
