const Mentor = require("../models/mentors.model");
const createError = require("http-errors");

async function create(data) {
  //Method find returns an array
  //Method findOne return the first one as an object
  const existingMentor = await Mentor.findOne({ email: data.email });

  if (existingMentor) {
    throw createError(409, "Email alredy used");
  }
  const newMentor = await Mentor.create(data);
  return newMentor;
}

async function getAll() {
  const mentors = await Mentor.find({});
  return mentors;
}

async function getById(id) {
  const mentor = await Mentor.findById(id);
  return mentor;
}

async function updateById(id, newData) {
  const mentorFound = await Mentor.findById(id);
  if (!mentorFound) {
    throw createError(404, "Mentor not found");
  }
  const mentor = await Mentor.findByIdAndUpdate(id, newData, { new: true });
  return mentor;
}

async function deleteById(id) {
  const mentorFound = await Mentor.findById(id);
  if (!mentorFound) {
    throw createError(404, "Mentor not found");
  }
  const deleteMentor = await Mentor.findByIdAndDelete(id);
  return deleteMentor;
}

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
