import express from "express";
import authRoutes from "./infrastructure/http/routes/authRoutes.js";
import siteRoutes from "./infrastructure/http/routes/siteRoutes.js";
import "./infrastructure/scheduler/siteStatusScheduler.js";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/sites", siteRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
