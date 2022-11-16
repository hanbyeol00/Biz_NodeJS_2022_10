import _tbl_user from "./tbl_user.js";

const initModels = (sequelize) => {
  const tbl_user = _tbl_user(sequelize);

  return {
    tbl_user,
  };
};

export default initModels;
