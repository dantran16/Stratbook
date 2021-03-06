require("dotenv").config();

//importing packages modules
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");

const User = require("./models/user");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/stratbook";

//importing local packages
const ExpressError = require("./utils/ExpressError.js");

//Routes
const usersRoutes = require("./routes/users");
const strategiesRoutes = require("./routes/strategies");
const playersRoutes = require("./routes/players");

//Mongoose setup
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const app = express();

//Express app settings
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Express middleware functions
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(methodOverride("_method")); //to allow us to use other HTTP verbs besides just POST and GET
app.use(express.static(path.join(__dirname, "public"))); //Allows us to use public directory on our templates

const store = MongoStore.create({
	mongoUrl: dbUrl,
	secret: "secret",
	touchAfter: 24 * 60 * 60,
});

store.on("error", (e) => {
	console.log("Session store error!", e);
});

//Setting up cookies
const sessionConfig = {
	store,
	secret: "secret",
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};
app.use(session(sessionConfig));
app.use(flash());

//Middleware for user functionality
app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Cookie/session variables
app.use((req, res, next) => {
	console.log(req.session);
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

//Routes
app.use("/", usersRoutes);
app.use("/strategies", strategiesRoutes);
app.use("/strategies/:strategyId/player/:id", playersRoutes);

//Home page
app.get("/", (req, res) => {
	res.redirect("/strategies");
});

app.all("*", (req, res, next) => {
	next(new ExpressError("Page not found!", 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "Something went wrong";
	res.status(statusCode).render("error", {
		err,
	});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});
