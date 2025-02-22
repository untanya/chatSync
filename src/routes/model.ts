import { Router } from "express";
import { initORM } from "../config/db.js";
import { Model } from "../modules/model/model.entity.js"; 

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { em, modelRepo } = await initORM();
    const { pseudo, platform, profile_link, cup, public_state } = req.body;
    const model = modelRepo.create({ 
        pseudo, 
        platform,
        profile_link,
        cup,
        public_state,
    });
    await em.persistAndFlush(model);
    res.status(201).json(model);
  } catch (error) {
    console.error("❌ Erreur lors de la création d'un utilisateur :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { em } = await initORM();
    const models = await em.findAll(Model);
    res.json(models);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:model", async (req, res): Promise<any> => {
  try {
    const modelId = parseInt(req.params.model, 10); // Conversion en nombre

    if (isNaN(modelId)) {
      return res.status(400).json({ error: "ID model invalide" });
    }

    const { em } = await initORM();
    const result = await em.findOneOrFail(Model, { id: modelId });

    return res.json(result);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du model :", error);
    return res.status(404).json({ error: "Model non trouvé" });
  }
});

router.delete("/models/:id", async (req, res): Promise<any> => {
  try {
    const { em, modelRepo } = await initORM();
    const modelId = parseInt(req.params.id, 10);

    if (isNaN(modelId)) {
      return res.status(400).json({ error: "ID modèle invalide" });
    }

    const model = await modelRepo.findOne(modelId);
    if (!model) {
      return res.status(404).json({ error: "Modèle non trouvé" });
    }

    await em.removeAndFlush(model);
    return res.json({ message: "Modèle supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression du modèle :", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
