import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "tasks",
      timestamps: true,
      underscored: true,
    },
  );
};
