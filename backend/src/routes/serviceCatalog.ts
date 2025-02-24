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
  const { serviceCatalogRepo } = await initORM();
  return getAllEntities(req, res, serviceCatalogRepo, "ServicesCatalog");
});

router.get("/:id", async (req, res) => {
  const { serviceCatalogRepo } = await initORM();
  return getEntity(req, res, serviceCatalogRepo, "ServicesCatalog");
});

router.post("/", async (req, res) => {
  const { serviceCatalogRepo } = await initORM();
  return createEntity(req, res, serviceCatalogRepo, "ServicesCatalog");
});

router.put("/:id", async (req, res) => {
  const { serviceCatalogRepo } = await initORM();
  return updateEntity(req, res, serviceCatalogRepo, "ServicesCatalog");
});

router.patch("/:id", async (req, res) => {
  const { serviceCatalogRepo } = await initORM();
  return patchEntity(req, res, serviceCatalogRepo, "ServicesCatalog");
});

router.delete("/:id", async (req, res) => {
  const { serviceCatalogRepo } = await initORM();
  return deleteEntity(req, res, serviceCatalogRepo, "ServicesCatalog");
});

export default router;
