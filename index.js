require("dotenv").config();
const server = require("./src/server");
const port = 8080;
const db = require("./src/lib/db");

db.connect()
  .then(() => {
    console.log("DB connected");
    server.listen(port, () => {
      console.log("server is runnning on port", port);
    });
  })
  .catch((error) => {
    console.log(`Error in DB connection: ${error}`);
  });
