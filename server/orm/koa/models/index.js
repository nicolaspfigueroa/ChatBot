const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorAliases: false
};

//holds all of the data for the connection on pgAdmin
//DB name, user name, password, configuration
const sequelize = new Sequelize('orm', 'postgres', 'admin', config);
const db = {};

//filestream to read all files in directory and return as an array of strings
const files = fs.readdirSync(__dirname);

//loop through all files in the models directory, if they are not
//the index file, pass in instance of sequelize  that is connected
// to the database, and Object Sequelize
for (const file of files) {
  if (file !== 'index.js') {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
    //console.log(model.name);
  }
}

for (const model in db) {
  if (db[model].associate) db[model].associate(db);
}


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;