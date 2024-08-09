const express = require("express");
const mentorsUseCase = require("../usecases/mentor.usecases");
const createError = require("http-errors");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const mentors = await mentorsUseCase.getAll();
    response.json({
      success: true,
      message: "All mentors",
      data: { mentors },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const mentor = await mentorsUseCase.getById(id);
    if (!mentor) {
      throw createError(404, "Mentor not found");
    }
    response.json({
      success: true,
      message: "Mentor by id",
      data: { mentor },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const mentorData = request.body;
    const newMentor = await mentorsUseCase.create(mentorData);
    response.json({
      success: true,
      message: "Mentor created",
      data: { mentor: newMentor },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const mentorData = request.body;
    const mentorUpdated = await mentorsUseCase.updateById(id, mentorData);
    response.json({
      success: true,
      message: "Mentor updated",
      data: { koder: mentorUpdated },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const mentor = await mentorsUseCase.deleteById(id);
    response.json({
      success: true,
      message: "Mentor deleted by id",
      data: { mentor },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
