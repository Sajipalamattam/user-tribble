module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Domlin1225$",
  DB: "Userdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};