import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_category",
    {
      t_seq: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      seq: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      category: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_category",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "seq" }],
        },
      ],
    }
  );
};
