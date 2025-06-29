const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const QueueHistory = sequelize.define(
  "QueueHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Services",
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    totalTickets: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    averageWaitTime: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    peakHour: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    completedTickets: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    abandonedTickets: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "queue_history",
    timestamps: true,
    indexes: [
      {
        fields: ["serviceId", "date"],
      },
    ],
  }
);

module.exports = QueueHistory;
