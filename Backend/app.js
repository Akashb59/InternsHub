const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(cors());

// Global Middleware

//1.Serving static files
//app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

//2.Set security HTTP headers
app.use(helmet());

//3.Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//4.Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour'
});
app.use('/api', limiter);

//5.Body parser, reading data from body into req.body and cookie parser
app.use(
  express.json({
    limit: '10kb'
  })
);
app.use(cookieParser());

//6.Data sanitization against noSQL query injection
app.use(mongoSanitize());

//7.Data sanitization against XSS
app.use(xss());

//8.Prevent parameter pollution (Be aware that same parameter does not work if used twice)
app.use(
  hpp({
    //Whitelist all fields required in the end!!!!
    whitelist: ['age'] //['','','']
  })
);

/* app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
}); */

//9.Test middleware and display date
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  console.log(req.requestTime);
  next();
});

//route handler
/* app.get('/api/v1/interns', getAllInterns);
app.get('/api/v1/interns/:id', getInternById);
app.post('/api/v1/interns', createIntern);
app.patch('/api/v1/interns/:id', updateIntern);
app.delete('/api/v1/interns/:id', deleteIntern); */
const internRouter = require('./routes/internRoutes');
const addressRouter = require('./routes/addressRoutes');
const companyRouter = require('./routes/companyRoutes');
const internshipRouter = require('./routes/internshipRoutes');
const placementCellRouter = require('./routes/placementCellRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const userRouter = require('./routes/userRoutes');
const userTypeMasterRouter = require('./routes/userTypeMasterRoutes');
const skillTypeMasterRouter = require('./routes/skillTypeMasterRoutes');
const studentRouter = require('./routes/studentRoutes');
const AppError = require('./utils/appError');
const enquiryRouter = require('./routes/enquiryRoutes');
const globalErrorHandler = require('./controllers/errorController');

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
//Routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/interns', internRouter);
app.use('/api/v1/addresses', addressRouter);
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/placementCells', placementCellRouter);
app.use('/api/v1/internships', internshipRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/skillTypeMasters', skillTypeMasterRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/enquiries', enquiryRouter);
app.use('/api/v1/userTypeMasters', userTypeMasterRouter);

//10.Global error handling middleware
app.use(globalErrorHandler);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
/*   res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`
  }); */
/*   const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404; */

//start server
module.exports = app;
