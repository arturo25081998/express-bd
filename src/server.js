const express = require("express");

const app = express();
const kodersRoutes = require("./routes/koders.router");
const MentorsRoutes = require("./routes/mentors.router");

app.use(express.json());
app.use("/koders", kodersRoutes);
app.use("/mentors", MentorsRoutes);

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Kodemia API",
  });
});

module.exports = app;
