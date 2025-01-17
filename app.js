const express = require('express');
const session = require('express-session');

const mongodb = require("./db/connection");
const MongoStore = require('connect-mongo');
const path = require('path');

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const config = require("./config");

// Rutas
const routes = require("./routes/routes");
const indexRoutes = require("./routes/index.route");
const authRoutes = require("./routes/auth.route");
const dashboardRoutes = require("./routes/dashboard.route");
const adminRoutes = require("./routes/admin.route");

// Texts
const literals = require("./constants/strings")

// App, session y DB
const app = express();

mongodb();

// Session
app.use(session({
    secret: "supersecureandsecretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: config.mongoURI,
        collectionName: config.sessionsCollection,
        ttl: 60 * 60 * 24
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas + literals a locals, para que estén globalmente
// accesibles
app.use((req, res, next) => {
    res.locals.routes = routes;
    res.locals.literals = literals;
    next();
});

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/admin", adminRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
