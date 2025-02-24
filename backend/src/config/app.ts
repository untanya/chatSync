import express from "express";
import cors from "cors"; // Import de CORS
import { initORM } from "./db.js"; // Connexion à MikroORM

import userRoutes from "../routes/user.js"; // Import des routes (à créer plus tard)
import messageRoutes from "../routes/message.js";
import modelRoutes from "../routes/model.js";
import pricingRoutes from "../routes/pricing.js";
import serviceCatalogRoutes from "../routes/serviceCatalog.js";
import conversationRoutes from "../routes/conversation.js";
import path from "node:path";

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

    // Test API
    app.get("/api/test", (req, res) => {
      res.json({ message: "API en TypeScript fonctionne !" });
    });

    // En mode production, servir React
    if (process.env.NODE_ENV === "production") {
      const frontendPath = path.resolve("frontend", "build");
      app.use(express.static(frontendPath));

      app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
      });
    }

    // 📌 Définition des routes
    app.use("/users", userRoutes);
    app.use("/messages", messageRoutes);
    app.use("/models", modelRoutes);
    app.use("/pricings", pricingRoutes);
    app.use("/service-catalogs", serviceCatalogRoutes);
    app.use("/conversations", conversationRoutes);

  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation :", error);
    process.exit(1);
  }
})();

export default app;
