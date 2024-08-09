const express = require("express");
const kodersUseCase = require("../usecases/koders.usecases");
const createError = require("http-errors");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const koders = await kodersUseCase.getAll();
    response.json({
      success: true,
      message: "All koders",
      data: { koders },
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
    const koder = await kodersUseCase.getById(id);
    if (!koder) {
      throw createError(404, "koder not found");
    }
    response.json({
      success: true,
      message: "Koder by id",
      data: { koder },
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
    const koderData = request.body;
    const newKoder = await kodersUseCase.create(koderData);
    response.json({
      success: true,
      message: "Koder created",
      data: { koder: newKoder },
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
    const koderData = request.body;
    const koderUpdated = await kodersUseCase.updateById(id, koderData);
    response.json({
      success: true,
      message: "Koder updated",
      data: { koder: koderUpdated },
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
    const koder = await kodersUseCase.deleteById(id);
    response.json({
      success: true,
      message: "Koder deleted by id",
      data: { koder },
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
