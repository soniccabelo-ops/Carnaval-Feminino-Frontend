import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { blocoSchema } from "../schemas/blocoSchema";

export const getBlocos = async (req: Request, res: Response) => {
  const blocos = await prisma.bloco.findMany({ include: { eventos: true } });
  res.json(blocos);
};

export const createBloco = async (req: Request, res: Response) => {
  const parsed = blocoSchema.parse(req.body);
  const bloco = await prisma.bloco.create({ data: parsed });
  res.json(bloco);
};

export const updateBloco = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsed = blocoSchema.parse(req.body);
  const bloco = await prisma.bloco.update({ where: { id: Number(id) }, data: parsed });
  res.json(bloco);
};

export const deleteBloco = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.bloco.delete({ where: { id: Number(id) } });
  res.json({ message: "Bloco deletado" });
};