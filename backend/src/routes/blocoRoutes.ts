import { Router } from "express";
import { getBlocos, createBloco, updateBloco, deleteBloco } from "../controllers/blocoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getBlocos);
router.post("/", authMiddleware, createBloco);
router.put("/:id", authMiddleware, updateBloco);
router.delete("/:id", authMiddleware, deleteBloco);

export default router;