const mongoose = require('mongoose');
const dotenv = require('dotenv');

//sync
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION, Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({ path: './config.env' });
dotenv.config({ path: './.envSecret' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<DB_PASSWORD>',
  process.env.DB_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connection successful'));

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`running on port ${port}...`);
});

//async
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION, Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
