////////////////////////////**Packages**\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
// const cookieParser = require('cookie-parser')
const passport = require("passport");
require('./config/passport.js')
const session = require('express-session')
///////////////////////////Files
const AppError = require("./utils/AppError");
// app.use(express.static(__dirname + "public"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL, // Replace with your frontend's URL
  credentials: true, // This allows cookies to be sent in CORS requests
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
// app.use(cookieParser())
// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(helmet());
app.use(morgan("tiny"));

//RATE LIMITING
const limiter = rateLimit({
  windowMs: 45 * 60 * 1000, // 45 minutes
  max: 100000, // Limit each IP to 100 requests per `window` (here, per 45 minutes)
  message: "Too many requests send. Please try again in a45 minutes",
});
app.use("/api", limiter);

//SANITIZATION OF REQUESTS FROM NOSQL  INJECTIONS
app.use(mongoSanitize());

//PREVENTING JS OR HTML IN REQUESTS
app.use(xssClean());

//PREVENTING PARAMETER POLLUTION
app.use(
  hpp({
    whitelist: [
      //will not be affected by hpp
    ],
  })
);

// if(!process.env.JWT_KEY)
// {
//     console.log("FATAL ERROR: JWT KEY is not found!")
//     process.exit(1)
// }

//ROUTERS
const userRouter = require("./routes/userRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");
const productRouter = require("./routes/productRoutes.js");
const ratingRouter = require("./routes/ratingRoutes.js");
const googleAuthRouter = require('./config/googleauth.js')



//ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/ratings", ratingRouter);
app.use("/", googleAuthRouter);

app.get('/', async (req, res, next) => {
  res.send("hello")
})
app.get('/api/v1', async (req, res, next) => {
  try {
    await res.sendFile(__dirname + '/index.html');
  } catch (error) {
    // Handle the error here
    console.log(error);
    next(new AppError(500, "Internal server error")); // Pass the error to the error-handling middleware
  }
});
app.get('/api/v1/fail', async (req, res, next) => {
  try {
    await res.send("failed");
  } catch (error) {
    // Handle the error here
    console.log(error);
    next(new AppError(500, "Internal server error")); // Pass the error to the error-handling middleware
  }
});



//PREVENTING REACHING UNDEFINED ROUTES
app.all("*", (req, res, next) => {
  next(
    new AppError(`Couldn't find the ${req.originalUrl} on this server!`, 404)
  );
});

const globalErrorHandler = require("./controllers/errorController");
app.use(globalErrorHandler);
module.exports = app;
