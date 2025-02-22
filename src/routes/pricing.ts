import { Router } from "express";
import { initORM } from "../config/db.js";
import { Pricing } from "../modules/pricing/pricing.entity.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { em, pricingRepo } = await initORM();
    const { duration, rate } = req.body;
    const pricing = pricingRepo.create({ duration, rate });
    await em.persistAndFlush(pricing);
    res.status(201).json(pricing);
  } catch (error) {
    console.error("❌ Erreur lors de la création d'un utilisateur :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { em } = await initORM();
    const pricings = await em.findAll(Pricing);
    res.json(pricings);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:price", async (req, res): Promise<any> => {
  try {
    const priceId = parseInt(req.params.price, 10); // Conversion en nombre

    if (isNaN(priceId)) {
      return res.status(400).json({ error: "ID prix invalide" });
    }

    const { em } = await initORM();
    const result = await em.findOneOrFail(Pricing, { id: priceId });

    return res.json(result);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du prix :", error);
    return res.status(404).json({ error: "Prix non trouvé" });
  }
});

export default router;
