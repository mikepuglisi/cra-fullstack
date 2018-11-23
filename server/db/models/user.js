'use strict'
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        userName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {})
    User.beforeCreate((user, options) => {
      return bcrypt.hash(user.password, 10)
          .then(hash => {
              user.password = hash;
          })
          .catch(err => {
              throw new Error();
          });
    });
    User.associate = ({Comment, Tag}) => {

    }

    return User
}