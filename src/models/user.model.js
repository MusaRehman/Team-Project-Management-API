import { DataTypes } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("ADMIN", "EMPLOYEE", "USER"),
        defaultValue: "USER",
      },
      org_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      org_invitation:{
        type: DataTypes.ENUM("PENDING", "ACCEPTED", "REJECTED"),
        defaultValue: "PENDING",
      }
    },
    {
      tableName: "users",
      timestamps: true,
      underscored: true,
    },
  );

  return User;
};
