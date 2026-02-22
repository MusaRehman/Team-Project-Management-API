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
      comment: { type: DataTypes.TEXT },
      org_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      tableName: "tasks",
      timestamps: true,
      underscored: true,
    },
  );
};
