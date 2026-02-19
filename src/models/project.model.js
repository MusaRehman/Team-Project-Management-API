import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Project",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
    },
    {
      tableName: "projects",
      timestamps: true,
      underscored: true,
    },
  );
};
