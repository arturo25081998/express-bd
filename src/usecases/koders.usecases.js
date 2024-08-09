const Koder = require("../models/koder.model");
const createError = require("http-errors");

async function create(data) {
  const newKoder = await Koder.create(data);
  return newKoder;
}

async function getAll() {
  const koders = await Koder.find({});
  return koders;
}

async function getById(id) {
  const koder = await Koder.findById(id);
  return koder;
}

async function updateById(id, newData) {
  const koderFound = await Koder.findById(id);
  if (!koderFound) {
    throw createError(404, "koder not found");
  }
  const koder = await Koder.findByIdAndUpdate(id, newData, { new: true });
  return koder;
}

async function deleteById(id) {
  const koderFound = await Koder.findById(id);
  if (!koderFound) {
    throw createError(404, "koder not found");
  }
  const deleteKoder = await Koder.findByIdAndDelete(id);
  return deleteKoder;
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
