const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

console.log(process.env.NODE_ENV);
console.log(process.env.CONNECTION_STRING);

