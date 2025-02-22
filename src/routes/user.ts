import { Router } from "express";
import { initORM } from "../config/db.js";
import { User } from "../modules/user/user.entity.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { em, userRepo } = await initORM();
    const { pseudo, base_city, contact_info, token } = req.body;
    const user = userRepo.create({ pseudo, base_city, contact_info, token });
    await em.persistAndFlush(user);
    res.status(201).json(user);
  } catch (error) {
    console.error("❌ Erreur lors de la création d'un utilisateur :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res): Promise<any> => {
  try {
    const { em, userRepo } = await initORM();
    const { id } = req.params;
    const { pseudo, base_city, contact_info, token } = req.body;

    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID utilisateur invalide" });
    }

    // Recherche de l'utilisateur
    const user = await userRepo.findOne(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Vérification que toutes les données sont bien fournies
    if (!pseudo || !base_city || !contact_info || !token) {
      return res.status(400).json({ error: "Toutes les données doivent être fournies pour un PUT." });
    }

    // Remplacement complet des champs
    user.pseudo = pseudo;
    user.base_city = base_city;
    user.contact_info = contact_info;
    user.token = token;

    await em.persistAndFlush(user);
    return res.json(user);
  } catch (error) {
    console.error("❌ Erreur lors du remplacement de l'utilisateur :", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/:id", async (req, res): Promise<any> => {
  try {
    const { em, userRepo } = await initORM();
    const { id } = req.params;
    const updates = req.body; // Contient seulement les champs à modifier

    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID utilisateur invalide" });
    }

    // Recherche de l'utilisateur
    const user = await userRepo.findOne(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Mise à jour dynamique avec `for...of`
    for (const key of Object.keys(updates)) {
      if (updates[key] !== undefined) {
        (user as any)[key] = updates[key];
      }
    }

    await em.persistAndFlush(user);
    return res.json(user);
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour de l'utilisateur :", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { em } = await initORM();
    const users = await em.findAll(User);
    res.json(users);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:user", async (req, res): Promise<any> => {
  try {
    const userId = parseInt(req.params.user, 10); // Conversion en nombre

    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID utilisateur invalide" });
    }

    const { em } = await initORM();
    const result = await em.findOneOrFail(User, { id: userId });

    return res.json(result);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l'utilisateur :", error);
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }
});


export default router;
