const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenServicio = sequelize.define(
  'OrdenServicio',
  {
    numeroOrden: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    equipo: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    servicio: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    fechaIngreso: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    fechaEntrega: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    tecnico: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  {
    tableName: 'ordenes_servicio',
  }
);

module.exports = OrdenServicio;