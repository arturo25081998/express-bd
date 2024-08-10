const Koder = require("../models/koder.model");
const createError = require("http-errors");
const encription = require("../lib/encription");
const jwt = require("../lib/jwt");

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
async function signUp(data) {
  existingKoder = await Koder.findOne({ email: data.email });
  if (existingKoder) {
    throw createError(400, "User aledy exist");
  }
  if (!data.password) {
    throw createError(400, "Password require");
  }
  if (data.password.length < 6) {
    throw createError(400, "Password not long enoght");
  }

  const password = encription.encrypt(data.password); //Se debe encriptar
  data.password = password;
  const newKoder = await Koder.create(data);
  return newKoder;
}

async function login(data) {
  const koder = await Koder.findOne({ email: data.email }).select("+password");
  if (!koder) {
    throw createError(401, "Invalid credentials");
  }

  const isValidPassword = encription.compare(data.password, koder.password);

  if (!isValidPassword) {
    throw createError(401, "Invalid credentials");
  }

  const token = jwt.sign({ id: koder._id });
  return token;
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  signUp,
  login,
};
