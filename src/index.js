import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./infrastructure/http/routes/authRoutes.js";
import siteRoutes from "./infrastructure/http/routes/siteRoutes.js";
import "./infrastructure/scheduler/siteStatusScheduler.js";

const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "MonitoreAI API está funcionando!",
    status: "online",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

app.use("/auth", authRoutes);
app.use("/sites", siteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
