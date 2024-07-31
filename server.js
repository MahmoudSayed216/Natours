const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const connString = process.env.LOCAL_DATABASE;

mongoose
  .connect(connString, {
  })
  .then(con => {
    // console.log(con.connections);
    console.log('DB connection successfully initiated');
  });

console.log(`current environment: ${process.env.NODE_ENV}`);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('welcome to Natours');
  console.log(`listening on port ${port}`);
});

