var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config()

var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/indexRoutes');
var usersRouter = require('./routes/users');
var NEWSRouter = require('./routes/news-routes');
var adminRouter = require('./routes/admin-routes')
var filesRouter = require('./routes/files-routes')
var contactUs = require('./routes/contact-us')
var categoryRouter = require('./routes/category-routes')
var subCategoryRouter = require('./routes/sub-category-routes')

var app = express();
app.use(cors());

main().catch(err => console.log(err));

async function main(){
  await mongoose.connect(process.env.MONGODB_URL);
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1/health-check', indexRouter)
app.use('/users', usersRouter);
app.use('/api/v1/news', NEWSRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/contact-us', contactUs);
app.use('/api/v1/file', filesRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/sub-category', subCategoryRouter);

// Serve Static Files
app.use(express.static(path.join(__dirname, '../malaysia-news-website-portal', 'build')))
app.use(express.static(path.join(__dirname, '../', 'file-storage'))) 

// All Request to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../malaysia-news-website-portal', 'build', "index.html"))
})

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
