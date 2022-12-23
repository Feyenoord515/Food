const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    score: {
      type: DataTypes.FLOAT
    },

    healthScore:{
      type: DataTypes.FLOAT
    },

    image: {
      type: DataTypes.STRING
    },
    ingredients: {
      type: DataTypes.FLOAT
    },

    steps: {
      type: DataTypes.TEXT
    },
  },
    { timestamps: false }
  );
};
