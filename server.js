const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

console.log(process.env.DATABASE_USER, process.env.DATABASE_PASSWORD);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`running on port ${port}...`);
});
