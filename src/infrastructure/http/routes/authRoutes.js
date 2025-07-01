import express from "express";
import { prisma } from "../../../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "../../../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, plan } = req.body;

    if (!name || !email || !password || !plan) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }
    if (!["free", "premium"].includes(plan)) {
      return res.status(400).json({ message: "Plano inválido" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, plan },
      select: { id: true, name: true, email: true, plan: true },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email e senha obrigatórios" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Credenciais inválidas" });

  const token = jwt.sign(
    { id: user.id, email: user.email, plan: user.plan },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await prisma.planHistory.deleteMany({ where: { userId: id } });

    await prisma.site.deleteMany({ where: { userId: id } });

    await prisma.user.delete({ where: { id } });

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({
      message:
        "Erro ao deletar usuário. Verifique se não há dados relacionados bloqueando a exclusão.",
    });
  }
});

router.patch("/plan", auth, async (req, res) => {
  try {
    const { plan } = req.body;
    const { id } = req.user;

    if (!["free", "premium"].includes(plan)) {
      return res.status(400).json({ message: "Plano inválido" });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    if (user.plan === plan) {
      return res
        .status(200)
        .json({ message: `Usuário já está no plano ${plan}`, user });
    }

    await prisma.planHistory.create({
      data: {
        userId: id,
        oldPlan: user.plan,
        newPlan: plan,
      },
    });

    const updated = await prisma.user.update({
      where: { id },
      data: { plan },
      select: { id: true, name: true, email: true, plan: true },
    });

    res
      .status(200)
      .json({ message: `Plano alterado para ${plan}`, user: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar plano" });
  }
});

export default router;
