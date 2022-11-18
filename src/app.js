const express = require("express");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credentials");
const verifyJWT = require("./middlewares/verifyJWT");

const app = express();
const port = process.env.PORT || 3500;

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// middleware to compress data
app.use(compression());

// app.get("/", async (req, res) => {
//   const sql = "SELECT * FROM logs limit 300";
//   connection.query(sql, function (err, result) {
//     res.send(result);
//   });
// });

app.use("/auth", require("./routes/auth"));

// MiddleWare for Protected routes
app.use(verifyJWT);
// app.use("/buyer", require("./routes/buyer"));
// app.use("/seller", require("./routes/seller"));

app.all("*", (req, res) => {
  res.status(404).send({
    error: true,
    code: 404,
    msg: "Api Not Found",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
