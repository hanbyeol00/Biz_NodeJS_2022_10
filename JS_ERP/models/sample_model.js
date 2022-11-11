import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "tbl_buyer",
    {
      b_id: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      b_comname: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      b_comtel: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false,
      },
      b_name: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: true,
      },
      b_tel: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: true,
      },
      b_addr: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
    },
    {
      sequelize,
      // tableName 을 생략하면
      // CREATE TABLE 명령이 실행될때 table 이름이 복수로 생성된다
      tableName: "tbl_buyer",

      // createAT, updateAT 칼럼을
      // 생성(true, 기본값) 할것인가 말것(false)인가
      // timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "b_id" }],
        },
      ],
    }
  );
};
