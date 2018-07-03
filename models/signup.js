module.exports = function(sequelize, DataTypes) {
    const SignUps = sequelize.define("SignUps", {
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      signUpName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      signUpMobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      signUpEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      }
    });
    return SignUps;
  }