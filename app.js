require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

//Routers
const authRouter = require("./routes/authRouter");
const patientRouter = require("./routes/patientRouter");

//Error handling middlewares
const notFoundMiddleware = require("./middlewares/notFoundMiddleWare");
const errorHandler = require("./middlewares/errorHandler");

//middlewares
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/patient", patientRouter);

app.use(express.urlencoded({ limit: "10mb", extended: "true" }));

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("TACSFON Web API");
});

app.use(notFoundMiddleware);
app.use(errorHandler);

// https://tacsfon-backend.vercel.app/api/v1/exco/

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

start();
