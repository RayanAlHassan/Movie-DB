//step 1
const express = require("express"); // get express package
const app = express(); // to make l app work with express
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const today = new Date();

app.get("/", (req, res) => {
  res.send("OKkk");
  console.log("here");
});

//step 3
app.get("/test", (req, res) => {
  res.status(200).json({ status: 200, message: "ok" }); // if we want to send message with status we use .status , but if we want just send status we use .sendStatus
});
app.get("/time", (req, res) => {
  var time = today.getHours() + ":" + today.getMinutes();
  res.status(200).json({ status: 200, time: time });
});

//step 4
app.get("/hello/:id?/", (req, res) => {
  let id = req.params.id || "Fadi";
  let statuss = res.status(200);
  res.status(200).json({ status: 200, message: "hello ", id: id });
});

// step 4
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

// step 5
app.get("/movies/create/:id?", (req, res) => {
  //id here is optional cz we have ? after the variable also we define a var in the pathe by (:)
  let id = req.params.id || "Fadi";
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
  res.status(200).json({ status: 200, message: "hello ", rate: rate });
});

app.get("/movies/delete", (req, res) => {
  let id = req.params.id || "Fadi";
  res.status(200).json({ status: 200, message: "hello ", id: id });
});

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  // { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
  { title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
];

//step 6
app.get("/movies/read/by-date", (req, res) => {
  const sortDataByDate = movies.slice().sort((a, b) => a.year - b.year);
  //.slice with empty arg will give me the array in new array with all element
  // .sort with fuction of comparaision that takes two element from array and sort it depend on : if a-b = neg nb will put a befor b and vice versa
  console.log(sortDataByDate);
  res.status(200).json({ status: 200, data: sortDataByDate });
});

app.get("/movies/read/by-rating", (req, res) => {
  const sortDataByRate = movies.slice().sort((a, b) => b.rating - a.rating);
  // .sort  takes two element from array and sort it depend on : if a-b = neg nb will put b befor a and vice versa
  console.log(sortDataByRate);
  res.status(200).json({ status: 200, data: sortDataByRate });
});

app.get("/movies/read/by-title", (req, res) => {
  const sortDataByTitle = movies.slice().sort((a, b) => a.title - b.title);
  // .sort  takes two element from array and sort it depend on : if a-b = neg nb will put b befor a and vice versa (nb of char)
  console.log(sortDataByTitle);
  res.status(200).json({ status: 200, data: sortDataByTitle });
});

// step 7
app.get("/movies/read/id/:ID?", (req, res) => {
  const ID = req.params.ID || "2";
  for (let i = 0; i < movies.length; i++) {
    // console.log(movies.length);
    if (ID > movies.length) {
      res.status(404).json({
        status: 404,
        error: true,
        message: `the movie ${ID} does not exist`,
      });
    } else {
      // console.log(typeof parseInt(ID));
      res.status(200).json({ status: 200, data: movies[ID - 1] });
    }
  }
});

// step 8
app.get("/movies/add", (req, res) => {
  // /movies/add?title=Red notice&year=2000&rating=8
  const Title = req.query.title;
  const Year = req.query.year;
  const Rating = req.query.rating || "4";
  var newMovie = { title: Title, year: Year, rating: Rating };
  // checking if the year is 4 digit or number . we convert the json to number to take it as a number ; and then we check if its number
  if (newMovie.year.length !== 4 || isNaN(parseInt(newMovie.year))) {
    res.status(403).json({
      status: 403,
      error: true,
      message:
        "You cannot create a movie without providing a valid 4-digit year.",
    });
  }

  if (!newMovie.title) {
    return res.status(403).json({
      status: 403,
      error: true,
      message: "You cannot create a movie without providing a title.",
    });
  }
  if (newMovie.title && newMovie.year && newMovie.rating) {
    let newList = movies.push(newMovie);
    res.json(newMovie); // show the new movie added

    // req.newList = newList; // store the new value in a separated variable
    // next(); // we send the variable to the next route
  }
});
app.get("movies/read", (req, res) => {
  // /movies/read
  // const newList = req.newList; // get the sorted variuable from the previous route
  res.json(movies);
});

//step 9
// removed app.get on **read** cz we dont need it , we already have one

app.get("/movies/delete/:Id?", (req, res) => {
  let Id = req.params.Id;
  if (Id > movies.length || Id < 1) {
    res.status(404).json({
      status: 404,
      error: true,
      message: `the movie ${Id} does not exist`,
    });
  }
  movies.splice(Id - 1, 1);
  res.status(200).json({
    status: 200,
    data: `movie with id ${Id} was deleted successfully`,
  });
});

//step 10
app.get("/movies/update/:ID", (req, res) => {
  let ID = req.params.ID;
  let TITLE = req.query.title;
  let RATING = req.query.rating;
  let YEAR = req.query.year;

  if (ID > movies.length || ID < 1) {
    res.status(404).json({ status: 404, error: `this ${ID} not found` });
  } else {
    if (TITLE) {
      movies[ID - 1].title = TITLE;
    }
    if (RATING) {
      movies[ID - 1].rating = RATING;
    }
    if (YEAR) {
      movies[ID - 1].year = YEAR;
    }
    res.status(200).json({ status: 200, data: movies });
  }
});

//step 11

// add
app.post("/movies/add", (req, res) => {
  // /movies/add?title=Red notice&year=2000&rating=8
  // const Title = req.query.title;
  // const Year = req.query.year;
  // const Rating = req.query.rating || "4";
  const { TITLE, RATING, YEAR } = req.body;

  var newMovie = { title: TITLE, year: YEAR, rating: RATING };
  // checking if the year is 4 digit or number . we convert the json to number to take it as a number ; and then we check if its number
  if (YEAR.length > 4 || isNaN(YEAR)) {
    res.status(403).json({
      status: 403,
      error: true,
      message:
        "You cannot create a movie without providing a valid 4-digit year.",
    });
  }

  if (!newMovie.title) {
    return res.status(403).json({
      status: 403,
      error: true,
      message: "You cannot create a movie without providing a title.",
    });
  }
  if (newMovie.title && newMovie.year && newMovie.rating) {
    let newList = movies.push(newMovie);
    res.json(newMovie); // show the new movie added
  }
});

//delete
app.delete("/movies/delete", (req, res) => {
  let ID = req.body.ID;
  if (ID > movies.length || ID < 1) {
    res.status(404).json({
      status: 404,
      error: true,
      message: `the movie ${ID} does not exist`,
    });
  }
  movies.splice(ID - 1, 1);
  res.status(200).json({
    status: 200,
    data: `movie with id ${ID} was deleted successfully`,
  });
});

//update
app.put("/movies/update", (req, res) => {
  let ID = req.body.ID;
  let TITLE = req.body.TITLE;
  let RATING = req.body.RATING;
  let YEAR = req.body.YEAR;

  if (ID > movies.length || ID < 1) {
    res.status(404).json({ status: 404, error: `this ${ID} not found` });
  } else {
    if (TITLE) {
      movies[ID - 1].title = TITLE;
    }
    if (RATING) {
      movies[ID - 1].rating = RATING;
    }
    if (YEAR) {
      movies[ID - 1].year = YEAR;
    }
    res.status(200).json({ status: 200, data: movies });
  }
});
app.listen(3000, () => {
  console.log("run server");
}); // give the port that we gonna opent in and  make function to test if server open
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log("server is runinf on port " + port);
// });
