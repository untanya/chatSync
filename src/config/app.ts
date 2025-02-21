import express from "express";
import cors from "cors"; // Import de CORS
import { initORM } from "./db.js"; // Connexion à MikroORM
import userRoutes from "../routes/user.js"; // Import des routes (à créer plus tard)

const app = express();

// 📌 Middleware global
app.use(express.json()); // Pour parser le JSON
app.use(cors()); // Active CORS pour les requêtes cross-origin

(async () => {
  try {
    const { orm } = await initORM(); // Initialisation de la DB
    console.log("✅ Base de données connectée !");

    app.get("/", (req, res) => {
        res.json({ message: "🚀 ChatSync API is running!" });
      });

    // 📌 Définition des routes
    app.use("/users", userRoutes);

  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation :", error);
    process.exit(1);
  }
})();

export default app;
