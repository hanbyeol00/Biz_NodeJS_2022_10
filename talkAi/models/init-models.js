import _tbl_talkwise from "./sample_model.js";
import _tbl_category from "./category.js";
const initModels = (sequelize) => {
  // models/sample_model.js 파일에 설정된 table 정보를 import 하고
  // 그정보를 사용하여 tbl_today 객체를 만들어라
  const tbl_talkwise = _tbl_talkwise(sequelize);
  const tbl_category = _tbl_category(sequelize);

  tbl_talkwise.hasMany(tbl_category, { as: "f_cate_talk", foreignKey: "seq" });
  tbl_category.belongsTo(tbl_talkwise, {
    as: "f_talk_cate",
    foreignKey: "t_seq",
  });

  return {
    tbl_talkwise,
    tbl_category,
  };
};

export default initModels;
