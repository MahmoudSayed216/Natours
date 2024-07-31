const fs = require('fs');
const Tour = require('../../models/tourModel');
console.log(__dirname)
const data = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));
console.log(data);



const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const connString = process.env.LOCAL_DATABASE;

mongoose
  .connect(connString, {
    useNewUrlParser: true
  })
  .then(con => {
    // console.log(con.connections);
    console.log('DB connection successfully initiated');
  });



const importData = async() =>{
  try {
    await Tour.create(data);
    console.log('data successfully imported');
  } catch (error) {
    console.log(error)
  }
  process.exit(1);
}


const deleteData = async () =>{
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit(1);
}

console.log(process.argv[2]);

if(process.argv[2] === '--import'){
  importData();
}

else if(process.argv[2] === '--delete'){
  deleteData();
}
