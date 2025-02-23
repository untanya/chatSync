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
  const { pricingRepo } = await initORM();
  return getAllEntities(req, res, pricingRepo, "Pricing");
});

router.get("/:id", async (req, res) => {
  const { pricingRepo } = await initORM();
  return getEntity(req, res, pricingRepo, "Pricing");
});

router.post("/", async (req, res) => {
  const { pricingRepo } = await initORM();
  return createEntity(req, res, pricingRepo, "Pricing");
});

router.put("/:id", async (req, res) => {
  const { pricingRepo } = await initORM();
  return updateEntity(req, res, pricingRepo, "Pricing");
});

router.patch("/:id", async (req, res) => {
  const { pricingRepo } = await initORM();
  return patchEntity(req, res, pricingRepo, "Pricing");
});

router.delete("/:id", async (req, res) => {
  const { pricingRepo } = await initORM();
  return deleteEntity(req, res, pricingRepo, "Pricing");
});

export default router;
