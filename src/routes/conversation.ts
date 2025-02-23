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
  const { conversationRepo } = await initORM();
  return getAllEntities(req, res, conversationRepo, "Conversation");
});

router.get("/:id", async (req, res) => {
  const { conversationRepo } = await initORM();
  return getEntity(req, res, conversationRepo, "Conversation");
});

router.post("/", async (req, res) => {
  const { conversationRepo } = await initORM();
  return createEntity(req, res, conversationRepo, "Conversation");
});

router.put("/:id", async (req, res) => {
  const { conversationRepo } = await initORM();
  return updateEntity(req, res, conversationRepo, "Conversation");
});

router.patch("/:id", async (req, res) => {
  const { conversationRepo } = await initORM();
  return patchEntity(req, res, conversationRepo, "Conversation");
});

router.delete("/:id", async (req, res) => {
  const { conversationRepo } = await initORM();
  return deleteEntity(req, res, conversationRepo, "Conversation");
});

export default router;
