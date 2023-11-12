const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "genre",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      created: true,
    }
  );
};
