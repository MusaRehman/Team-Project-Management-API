import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Organization",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
    },
    {
      tableName: "organizations",
      timestamps: true,
      underscored: true,
    },
  );
};
