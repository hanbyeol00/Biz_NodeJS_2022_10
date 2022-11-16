import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_users",
    {
      user_id: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      user_pw: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      user_nickname: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      user_email: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: true,
      },
      user_datebirth: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_users",
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
