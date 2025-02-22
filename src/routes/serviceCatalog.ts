import { Router } from "express";
import { initORM } from "../config/db.js";
import { ServicesCatalog } from "../modules/service_catalog/service_catalog.entity.js"; 

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { em, serviceCatalog } = await initORM();
    const { name, service_rate, pricing } = req.body;
    const service = serviceCatalog.create({ name, service_rate, pricing });
    await em.persistAndFlush(service);
    res.status(201).json(service);
  } catch (error) {
    console.error("❌ Erreur lors de la création d'un utilisateur :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { em } = await initORM();
    const services = await em.findAll(ServicesCatalog);
    res.json(services);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:service", async (req, res): Promise<any> => {
  try {
    const serviceId = parseInt(req.params.service, 10); // Conversion en nombre

    if (isNaN(serviceId)) {
      return res.status(400).json({ error: "ID service invalide" });
    }

    const { em } = await initORM();
    const result = await em.findOneOrFail(ServicesCatalog, { id: serviceId });

    return res.json(result);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du service :", error);
    return res.status(404).json({ error: "Service non trouvé" });
  }
});

router.delete("/service-catalog/:id", async (req, res): Promise<any> => {
  try {
    const { em, serviceCatalog } = await initORM();
    const serviceId = parseInt(req.params.id, 10);

    if (isNaN(serviceId)) {
      return res.status(400).json({ error: "ID service invalide" });
    }

    const service = await serviceCatalog.findOne(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service non trouvé" });
    }

    await em.removeAndFlush(service);
    return res.json({ message: "Service supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression du service :", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
