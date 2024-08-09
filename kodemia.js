const db = require("./src/lib/db");

const kodersActions = require("./src/commands/koders.commands");
const mentorsActions = require("./src/commands/mentors.commands");
const resource = process.argv[2]; // koders, mentors, generations
const action = process.argv[3]; // add, rm, ls

const allowedActions = {
  koders: kodersActions,
  mentors: mentorsActions,
  generations: {},
};

db.connect()
  .then(async () => {
    console.log("DB connected");
    const resourceActions = allowedActions[resource];

    if (!resourceActions) {
      console.error(`Unknow resource : ${resource}`);
      process.exit(3);
    }

    const requestedActions = resourceActions[action];

    if (!requestedActions) {
      console.error(`Unknow action: ${action}`);
      process.exit(2);
    }

    await requestedActions();
  })
  .catch((error) => {
    console.log(`DB connection error: ${error}`);
    process.exit(1);
  });

/*
Promises (promesas)

Es un compromiso de un ente a otro de que algo va a suceder en el futuro.

Estados:

-Pendiente (Pending)
-Resuelta (Fulfilled) .then(function(result))
-Rechazada (Rejected) .catch(function(error))
*/
