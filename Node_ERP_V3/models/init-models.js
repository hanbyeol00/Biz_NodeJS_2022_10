import _tbl_buyer from "./tbl_buyer.js";
import _tbl_users from "./tbl_users.js";
import _tbl_product from "./tbl_product.js";
import _tbl_products from "./tbl_products.js";

const initModels = (sequelize) => {
  const tbl_buyer = _tbl_buyer(sequelize);
  const tbl_users = _tbl_users(sequelize);
  const tbl_product = _tbl_product(sequelize);
  const tbl_products = _tbl_products(sequelize);

  return {
    tbl_users,
    tbl_buyer,
    tbl_product,
    tbl_products,
  };
};

export default initModels;
