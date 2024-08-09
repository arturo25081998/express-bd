const express = require("express");
const generationUseCase = require("../usecases/generatiosn.usecases");
const createError = require("http-errors");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const generations = await generationUseCase.getAll();
    response.json({
      success: true,
      message: "All generations",
      data: { generations },
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
    const generation = await generationUseCase.getById(id);
    if (!generation) {
      throw createError(404, "Generation not found");
    }
    response.json({
      success: true,
      message: "Generation by id",
      data: { generation },
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
    const generationData = request.body;
    const newGeneration = await generationUseCase.create(generationData);
    response.json({
      success: true,
      message: "Generation created",
      data: { generation: newGeneration },
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
    const generationData = request.body;
    const generationUpdated = await generationUseCase.updateById(
      id,
      generationData
    );
    response.json({
      success: true,
      message: "Generation updated",
      data: { generation: generationUpdated },
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
    const generation = await generationUseCase.deleteById(id);
    response.json({
      success: true,
      message: "Generation deleted by id",
      data: { generation },
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
