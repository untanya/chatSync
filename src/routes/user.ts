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

export default router;
