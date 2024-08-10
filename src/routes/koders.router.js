const express = require("express");
const kodersUseCase = require("../usecases/koders.usecases");
const createError = require("http-errors");
const router = express.Router();

const auth = require("../middlewares/auth");

router.get("/", auth, async (request, response) => {
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

router.get("/:id", auth, async (request, response) => {
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

router.post("/", auth, async (request, response) => {
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

router.patch("/:id", auth, async (request, response) => {
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

router.delete("/:id", auth, async (request, response) => {
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

router.post("/signup", async (request, response) => {
  try {
    const koderData = request.body;
    const newKoder = await kodersUseCase.signUp(koderData);
    response.json({
      success: true,
      message: "Koder registered",
      data: { koder: newKoder.id },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/login", async (request, response) => {
  try {
    const koderData = request.body;
    const token = await kodersUseCase.login(koderData);
    response.json({
      success: true,
      message: "Koder logged",
      data: { token },
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
