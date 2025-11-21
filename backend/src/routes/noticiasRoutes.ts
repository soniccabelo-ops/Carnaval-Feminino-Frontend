import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`https://gnews.io/api/v4/search?q=carnaval&token=${process.env.GNEWS_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar notícias" });
  }
});

export default router;