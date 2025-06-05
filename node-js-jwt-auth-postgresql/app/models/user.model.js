module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    location: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    nationality: {
      type: DataTypes.STRING
    },
    theme: {
      type: DataTypes.STRING
    }
  });

  return User;
};
