require('dotenv').config()

module.export = {
  "development": {
    "username": "root",
    "password": "animalHumanBeingCaramel100#",
    "database": "e-commerce",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "animalHumanBeingCaramel100#",
    "database": "e-commerce",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.PROD_USERNAME,
    "password": process.env.PROD_PASSWORD,
    "database": process.env.PROD_DATABASE,
    "host": process.env.PROD_HOSTNAME,
    "dialect": "postgres"
  }
}
