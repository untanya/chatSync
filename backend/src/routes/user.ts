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
  const { userRepo } = await initORM();
  return getAllEntities(req, res, userRepo, "Utilisateur");
});

router.get("/:id", async (req, res) => {
  const { userRepo } = await initORM();
  return getEntity(req, res, userRepo, "Utilisateur");
});

router.post("/", async (req, res) => {
  const { userRepo } = await initORM();
  return createEntity(req, res, userRepo, "Utilisateur");
});

router.put("/:id", async (req, res) => {
  const { userRepo } = await initORM();
  return updateEntity(req, res, userRepo, "Utilisateur");
});

router.patch("/:id", async (req, res) => {
  const { userRepo } = await initORM();
  return patchEntity(req, res, userRepo, "Utilisateur");
});

router.delete("/:id", async (req, res) => {
  const { userRepo } = await initORM();
  return deleteEntity(req, res, userRepo, "Utilisateur");
});

export default router;
