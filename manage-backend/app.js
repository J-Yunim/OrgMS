// App config password: ArCof6oVIb0LundU
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8001; // process.env.port is Heroku's port if you choose to deploy the app there

// Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", indexRouter);
app.use("/users", usersRouter);

// connect to db
const mongoose = require("mongoose");

const connectionURL =
  "mongodb+srv://admin:ArCof6oVIb0LundU@cluster0.hdwfu.mongodb.net/orgmsdb?retryWrites=true&w=majority";
mongoose
  .connect(connectionURL)
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port} :)`));
