import { Router } from "express";
import { initORM } from "../config/db.js";
import { Conversation } from "../modules/conversation/conversation.entity.js";
import { updateEntity, patchEntity } from "../controllers/dataHandler.js";

const router = Router();

router.post("/", async (req, res): Promise<any> => {
    try {
        // Vérification du retour de initORM()
        const { em, conversationRepo, userRepo, modelRepo } = await initORM();
        
        if (!em || !conversationRepo || !userRepo || !modelRepo) {
            throw new Error("Les repositories ne sont pas disponibles.");
        }

        const { from, to }: { from: number; to: number } = req.body;

        // Vérifier si `from` est un User ou un Model
        const fromUser = await userRepo.findOne(from);
        const fromModel = await modelRepo.findOne(from);
        const toUser = await userRepo.findOne(to);
        const toModel = await modelRepo.findOne(to);

        if (!fromUser && !fromModel) {
            return res.status(400).json({ error: "Expéditeur invalide" });
        }
        if (!toUser && !toModel) {
            return res.status(400).json({ error: "Destinataire invalide" });
        }

        // Création de la conversation avec les bonnes références
        const conversation = conversationRepo.create({
            fromUser: fromUser ?? undefined,
            fromModel: fromModel ?? undefined,
            toUser: toUser ?? undefined,
            toModel: toModel ?? undefined,
        });
        
        await em.persistAndFlush(conversation);
        return res.status(201).json(conversation);
    } catch (error) {
        const err = error as Error;
        console.error("❌ Erreur lors de la création d'une conversation :", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
  

router.get("/", async (req, res) => {
  try {
        const { em } = await initORM();
        const conversations = await em.findAll(Conversation);
        res.json(conversations);
  } catch (error) {
        console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:conversation", async (req, res): Promise<any> => {
  try {
    const conversationId = parseInt(req.params.conversation, 10); // Conversion en nombre

    if (isNaN(conversationId)) {
      return res.status(400).json({ error: "ID conversation invalide" });
    }

    const { em } = await initORM();
    const result = await em.findOneOrFail(Conversation, { id: conversationId });

    return res.json(result);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du conversation :", error);
    return res.status(404).json({ error: "Conversation non trouvé" });
  }
});

router.put("/conversations/:id", async (req, res) => updateEntity(req, res, (await initORM()).conversationRepo, "Conversation"));
router.patch("/conversations/:id", async (req, res) => patchEntity(req, res, (await initORM()).conversationRepo, "Conversation"));

router.delete("/conversations/:id", async (req, res): Promise<any> => {
  try {
    const { em, conversationRepo } = await initORM();
    const conversationId = parseInt(req.params.id, 10);

    if (isNaN(conversationId)) {
      return res.status(400).json({ error: "ID conversation invalide" });
    }

    const conversation = await conversationRepo.findOne(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation non trouvée" });
    }

    await em.removeAndFlush(conversation);
    return res.json({ message: "Conversation supprimée avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de la conversation :", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
