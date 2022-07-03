const ShoppingCart = require("../models/ShoppingCart.js");

async function getShoppingCart(req, res) {
  const { idUser } = req.query;
  console.log("🚀 ~ file: ShoppingCart.js ~ line 5 ~ getShoppingCart ~ idUser", idUser)
  try {
    if (idUser) {
      console.log("🚀 ~ file: ShoppingCart.js ~ line 8 ~ getShoppingCart ~ idUser", idUser)
      const dateShoppingCart = await ShoppingCart.findAll({
        where: { idUser: idUser },
      });
      console.log("🚀 ~ file: ShoppingCart.js ~ line 10 ~ getShoppingCart ~ dateShoppingCart", dateShoppingCart)
      return res.status(200).json(dateShoppingCart);
    } else{
      const allDateShoppingCart = await ShoppingCart.findAll();
     return res.json(allDateShoppingCart);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
async function postShoppingCart(req, res) {
  const {
    idUser,
    idEvent,
    nombre,
    schedule,
    quantity,
    variant,
    itemTotal,
    price,
  } = req.body;
  try {
    if (idUser && idEvent) {
     const allDateShoppingCart = await ShoppingCart.create({
       idUser: idUser,
       idEvent: idEvent   
      });
      return res.status(200).json(allDateShoppingCart);
    }else {
     return res
        .status(401)
        .json({ error: "No se lograron guardar los datos del carrito" });
    }

  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
async function deleteShoppingCart(req, res) {
  const { id } = req.query;
  try {
    const ShoppingSave = await ShoppingCart.findOne({ where: { id: id } });
    if (ShoppingSave) {
      const ShoppingDeleted = await ShoppingSave.destroy();
      return res.json({
        message: "Carrito eliminado",
        ShoppingSave,
        ShoppingDeleted,
      });
    } else {
      res
        .status(401)
        .json({ error: "No se encontraron datos con ese ID ", id });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
async function putShoppingCart(req, res) {
  const {
    id,
    idUser,
    idEvent,
    nombre,
    schedule,
    quantity,
    variant,
    itemTotal,
    price,
  } = req.body;
  try {
    const ShoppingSave = await ShoppingCart.findOne({ where: { id: id } });
    if (ShoppingSave) {
      const ShoppingUpdate = await ShoppingSave.update({
        idUser: idUser,
        idEvent: idEvent,
        nombre: nombre,
        schedule: schedule,
        quantity: quantity,
        variant: variant,
        itemTotal: itemTotal,
        price: price
      });
      return res.json({
        message: "Carrito Actualizado",
        ShoppingSave,
        ShoppingUpdate,
      });
    } else {
      res
        .status(401)
        .json({ error: "No se encontraron datos con ese ID ", id });
    }
  } catch (error) {}
}

module.exports = {
  getShoppingCart,
  postShoppingCart,
  deleteShoppingCart,
  putShoppingCart,
};
