import { Router } from "express";
import { initORM } from "../config/db.js";
import { 
  updateEntity, 
  patchEntity, 
  getAllEntities, 
  getEntity, 
  createEntity, 
  deleteEntity 
} from "../controllers/dataHandler.js";

const router = Router();

router.get("/", async (req, res) => {
  const { modelRepo } = await initORM();
  return getAllEntities(req, res, modelRepo, "Model");
});

router.get("/:id", async (req, res) => {
  const { modelRepo } = await initORM();
  return getEntity(req, res, modelRepo, "Model");
});

router.post("/", async (req, res) => {
  const { modelRepo } = await initORM();
  return createEntity(req, res, modelRepo, "Model");
});

router.put("/:id", async (req, res) => {
  const { modelRepo } = await initORM();
  return updateEntity(req, res, modelRepo, "Model");
});

router.patch("/:id", async (req, res) => {
  const { modelRepo } = await initORM();
  return patchEntity(req, res, modelRepo, "Model");
});

router.delete("/:id", async (req, res) => {
  const { modelRepo } = await initORM();
  return deleteEntity(req, res, modelRepo, "Model");
});

export default router;
