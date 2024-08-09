const utils = require("../utils");
const kodersUseCase = require("../usecases/koders.usecases");

async function add() {
  const firstName = utils.getArg("firstName");
  const lastName = utils.getArg("lastName");
  const email = utils.getArg("email");
  const newKoder = await kodersUseCase.create({
    firstName,
    lastName,
    email,
  });
  console.log("-- Koder created --");
  console.log(newKoder);
  process.exit(0);
}

async function rm() {
  const id = utils.getArg("id");
  const koderDeleted = await kodersUseCase.deleteById(id);
  console.log("-- Koder deleted --");
  console.table(koderDeleted);
  process.exit(0);
}

async function ls() {
  const koders = await kodersUseCase.getAll();
  console.log(koders);
  process.exit(0);
}

module.exports = {
  add,
  rm,
  ls,
};
