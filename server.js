const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
app.listen(port, () => {
  console.log(`running on port ${port}...`);
});
