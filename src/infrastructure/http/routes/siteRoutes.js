import express from "express";
import { prisma } from "../../../config/prisma.js";
import { auth } from "../../../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { url, interval } = req.body;
  const { id } = req.user;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  const plan = user.plan;

  if (!url || !interval)
    return res.status(400).json({ message: "URL e intervalo obrigatórios" });

  if (plan === "free" && interval < 60) {
    return res
      .status(400)
      .json({ message: "Intervalo mínimo para plano free é 60 minutos" });
  }
  if (plan === "premium" && interval < 5) {
    return res
      .status(400)
      .json({ message: "Intervalo mínimo para plano premium é 5 minutos" });
  }

  if (plan === "free") {
    const count = await prisma.site.count({ where: { userId: id } });
    if (count >= 1) {
      return res
        .status(403)
        .json({ message: "Plano free permite apenas 1 site" });
    }
  }

  const site = await prisma.site.create({
    data: { url, interval, userId: id },
  });

  res.status(201).json(site);
});

router.get("/", auth, async (req, res) => {
  const { id } = req.user;
  const sites = await prisma.site.findMany({ where: { userId: id } });
  res.json(sites);
});

export default router;
