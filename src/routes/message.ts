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
  const { messageRepo } = await initORM();
  return getAllEntities(req, res, messageRepo, "Message");
});

router.get("/:id", async (req, res) => {
  const { messageRepo } = await initORM();
  return getEntity(req, res, messageRepo, "Message");
});

router.post("/", async (req, res) => {
  const { messageRepo } = await initORM();
  return createEntity(req, res, messageRepo, "Message");
});

router.put("/:id", async (req, res) => {
  const { messageRepo } = await initORM();
  return updateEntity(req, res, messageRepo, "Message");
});

router.patch("/:id", async (req, res) => {
  const { messageRepo } = await initORM();
  return patchEntity(req, res, messageRepo, "Message");
});

router.delete("/:id", async (req, res) => {
  const { messageRepo } = await initORM();
  return deleteEntity(req, res, messageRepo, "Message");
});

export default router;
