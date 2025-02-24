import app from "./config/app.js";

const PORT = Number(process.env.PORT) || 8080;
const HOST = "0.0.0.0"; // Permet l'écoute sur toutes les interfaces

app.listen(PORT, HOST, () => {
  console.log(`🚀 Serveur démarré sur http://${HOST}:${PORT}`);
});
