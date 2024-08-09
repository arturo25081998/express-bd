const utils = require("../utils");
const mentorsUseCase = require("../usecases//mentor.usecases");

async function add() {
  const firstName = utils.getArg("firstName");
  const lastName = utils.getArg("lastName");
  const email = utils.getArg("email");
  const age = utils.getArg("age");
  const newMentor = await mentorsUseCase.create({
    firstName,
    lastName,
    email,
    age,
  });
  console.log("-- Mentor created --");
  console.log(newMentor);
  process.exit(0);
}

async function rm() {
  const id = utils.getArg("id");
  const mentorDeleted = await mentorsUseCase.deleteById(id);
  console.log("-- Mentor deleted --");
  console.table(mentorDeleted);
  process.exit(0);
}

async function ls() {
  const mentors = await mentorsUseCase.getAll();
  console.log(mentors);
  process.exit(0);
}

module.exports = {
  add,
  rm,
  ls,
};
