import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_talkwise",
    {
      seq: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      question: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      answer: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      audio: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tbl_talkwise",
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
