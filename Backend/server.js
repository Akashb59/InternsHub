/*eslint-disable */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//console.log(app.get('env'));
dotenv.config({
  path: './config.env'
});

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!! Shutting down...');
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

const app = require('./app');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() =>
    //console.log(con.connections);
    console.log('DB connection successful')
  );
//console.log(process.env);

const port = 3000 || process.env.PORT;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

//netstat -ano|findstr "PID :3000"
//taskkill /pid 18264 /f
