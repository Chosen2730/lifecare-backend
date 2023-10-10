require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

//Routers
const authRouter = require("./routes/authRouter");
const patientRouter = require("./routes/patientRouter");
const doctorRouter = require("./routes/doctorRoute");
const appointmentRouter = require("./routes/appointmentRoute");

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
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/appointment", appointmentRouter);

app.use(express.urlencoded({ limit: "10mb", extended: "true" }));

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("LIFE CARE WEB API");
});

app.use(notFoundMiddleware);
app.use(errorHandler);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

start();
