import express from "express";
import cors from "cors";
import blocoRoutes from "./routes/blocoRoutes";
import eventoRoutes from "./routes/eventoRoutes";
import authRoutes from "./routes/authRoutes";
import noticiasRoutes from "./routes/noticiasRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blocos", blocoRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/noticias", noticiasRoutes);

app.use(errorMiddleware);

export default app;