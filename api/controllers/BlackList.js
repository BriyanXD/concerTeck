const { where } = require("sequelize/types");
const BlackList = require("../models/BlackList");

function getAllBlackList(req, res) {
  try {
    const allBaned = BlackList.findAll();
    res.json(allBaned);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

function getAOneBlackList(req, res) {
  const { id, email, username } = req.query;
  try {
    if (id) {
      const findBaned = BlackList.findByPk(id);
      return res.json(findBaned);
    } else if (email) {
      const findBaned = BlackList.findOne({ where: {} });
      return res.json(findBaned);
    } else {
      const findBaned = BlackList.findOne({ where: {} });
      return res.json(findBaned);
    }
    res.json(allBaned);
  } catch (error) {}
}

function deleteOneBlackList(req, res) {
  try {
  } catch (error) {}
}

module.exports = {
  getAOneBlackList,
  getAllBlackList,
  deleteOneBlackList,
};
