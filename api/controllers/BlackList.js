const BlackList = require("../models/BlackList");
const { use } = require("../routes");

async function getAllBlackList(req, res) {
  try {
    const allBaned = await BlackList.findAll();
    res.json(allBaned);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
//para uscar usuarios baneados
function getAOneBlackList(req, res) {
  const { id, email, username } = req.query;
  try {
    if (id) {
      const findBaned = BlackList.findByPk(id);
      return res.json(findBaned);
    } else if (email) {
      const findBaned = BlackList.findOne({ where: { email: email } });
      return res.json(findBaned);
    } else {
      const findBaned = BlackList.findOne({ where: { username: username } });
      return res.json(findBaned);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function postOneBlackList(req, res) {
  const { email, username, name } = req.query;
  try {
    if (email) {
      const newBaned = await BlackList.findOrCreate({
        where: {
          email: email,
          username: username || "undefined",
          name: name || "undefined",
        },
      });
      res.json({ message: "Usuario Baneado", newBaned });
    } else {
      res.status(400).json({ error: "falta informacion" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function deleteOneBlackList(req, res) {
  const { id } = req.query;
  try {
    const findBaned = await BlackList.findByPk(id);
    const deleteBaned = await findBaned.destroy();
    return res.json({ message: "Usuario perdonado", findBaned });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getAOneBlackList,
  getAllBlackList,
  deleteOneBlackList,
  postOneBlackList,
};
