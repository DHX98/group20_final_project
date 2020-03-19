require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const index = require('./routes/index');
const info = require('./routes/info');
const faction = require('./routes/faction');
const religion = require('./routes/religion');
const race = require('./routes/race');
const kingdom = require('./routes/kingdom');
const character = require('./routes/character');
const Handlebars = require('hbs');
Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 == v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
const port = 4200;
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/info', info);
app.use('/faction', faction);
app.use('/religion', religion);
app.use('/race', race);
app.use('/kingdom', kingdom);
app.use('/character', character);
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
app.listen(port, () => console.log(`app listening on port ${port}!`));
module.exports = app;
