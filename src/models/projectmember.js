// project_members
// ----------------
// id (PK)

import { DataTypes } from "sequelize";

// user_id (FK → users.id)
// project_id (FK → projects.id)

// role ENUM('creator','editor','viewer')

// created_at
// updated_atimport { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "ProjectMember",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      project_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "projects",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      org_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "organizations",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      role: {
        type: DataTypes.ENUM("creator", "editor", "viewer"),
        allowNull: false,
      },
    },
    {
      tableName: "project_members",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "project_id"],
        },
      ],
    }
  );
};
