import { Router } from "express";
import { initORM } from "../config/db.js";
import { Message } from "../modules/message/message.entity.js";
import { updateEntity, patchEntity } from "../controllers/dataHandler.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { em, messageRepo } = await initORM();
        const { content, created_at, read_at, status, external_id, conversation } = req.body;
        const message = messageRepo.create({ 
            content,
            created_at,
            read_at,
            status,
            external_id,
            conversation,  
        });
        await em.persistAndFlush(message);
        res.status(201).json(message);
    } catch (error) {
        console.error("❌ Erreur lors de la création d'un utilisateur :", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/", async (req, res) => {
  try {
    const { em } = await initORM();
    const messages = await em.findAll(Message);
    res.json(messages);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:message", async (req, res): Promise<any> => {
  try {
    const messageId = parseInt(req.params.message, 10); // Conversion en nombre

    if (isNaN(messageId)) {
      return res.status(400).json({ error: "ID message invalide" });
    }

    const { em } = await initORM();
    const result = await em.findOneOrFail(Message, { id: messageId });

    return res.json(result);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du message :", error);
    return res.status(404).json({ error: "Message non trouvé" });
  }
});

router.put("/messages/:id", async (req, res) => updateEntity(req, res, (await initORM()).messageRepo, "Message"));
router.patch("/messages/:id", async (req, res) => patchEntity(req, res, (await initORM()).messageRepo, "Message"));

router.delete("/messages/:id", async (req, res): Promise<any> => {
  try {
    const { em, messageRepo } = await initORM();
    const messageId = parseInt(req.params.id, 10);

    if (isNaN(messageId)) {
      return res.status(400).json({ error: "ID message invalide" });
    }

    const message = await messageRepo.findOne(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message non trouvé" });
    }

    await em.removeAndFlush(message);
    return res.json({ message: "Message supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression du message :", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
