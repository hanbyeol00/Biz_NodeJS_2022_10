import Sequelize from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "tbl_user",
    {
      user_id: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true,
      },
      user_pass: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false,
      },
      user_email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      user_name: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false,
      },
      user_dateBirth: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      user_pop: {
        type: Sequelize.DataTypes.STRING(3),
        allowNull: true,
      },
      user_rock: {
        type: Sequelize.DataTypes.STRING(3),
        allowNull: true,
      },
      user_electronic: {
        type: Sequelize.DataTypes.STRING(3),
        allowNull: true,
      },
      user_hip_hop: {
        type: Sequelize.DataTypes.STRING(3),
        allowNull: false,
      },
      user_r_b: {
        type: Sequelize.DataTypes.STRING(3),
        allowNull: false,
      },
      user_jazz: {
        type: Sequelize.DataTypes.STRING(3),
        allowNull: true,
      },
      user_classic: {
        type: Sequelize.DataTypes.STRING(3),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tbl_user",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );
};
