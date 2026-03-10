var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasAPIRouter = require('./routes/api/bicicletas');

var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

var app = express();

/* ---------------- SWAGGER CONFIG ---------------- */

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Bicicletas API",
      version: "1.0.0",
      description: "API para la gestión de bicicletas (CRUD)"
    },
    servers: [
      {
        url: "https://bicis-1.onrender.com/",
        description: "Servidor local"
      }
    ]
  },
  apis: ["./routes/api/*.js"] // archivos donde están las anotaciones swagger
};

const specs = swaggerJsdoc(options);

/* ---------------- VIEW ENGINE ---------------- */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* ---------------- MIDDLEWARE ---------------- */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ---------------- SWAGGER ROUTE ---------------- */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/* ---------------- ROUTES ---------------- */

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Si hubiera versiones de API: /api/v1/bicicletas
app.use('/api/bicicletas', bicicletasAPIRouter);

/* ---------------- ERROR HANDLING ---------------- */

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;