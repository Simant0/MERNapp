const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//require('dotenv').config()

// from routes/products
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");

const connectionString = process.env.MONGO_URI;

//'mongodb://mongo:27017/store'

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(error);
  });

// connect to the database
/**mongoose.connect(
  "mongodb+srv://root:" +
    process.env.MONGO_ATLAS_PW +
    "@test-cluster.jc33v.mongodb.net/test-cluster?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);*/
mongoose.Promise = global.Promise;

//
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// prevent CORS errors
app.use((req, res, next) => {
  // put domain in place of * if only domain is to be allowed
  res.header("Acess-Control-Allow-Origin", "*");
  res.header(
    "Acess-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Acess-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.statu(200).json({});
  }
  next();
});

// routes to handle requests
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// custom error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// other error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// listen on port
app.listen(port, () => {
  console.log(`app.js listening at http://localhost: ${port}`);
});
