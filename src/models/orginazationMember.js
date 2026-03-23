import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "OrganizationMember",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      role: {
        type: DataTypes.ENUM("owner", "admin", "member"),
        allowNull: false,
      },      
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      org_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "organizations",
          key: "id",
        },
      },
    },
    {
      tableName: "organizationsmembers",
      timestamps: true,
      underscored: true,
    },
  );
};
