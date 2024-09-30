import { Router } from "express";
import { ContratanteController } from "../controllers/contratante-controllers";
const router = Router();
const constratanteController = new ContratanteController();
router.post("/contrantates", (req, res) => constratanteController.createContratante(req, res));
router.get("/contratamtes", (req, res) => constratanteController.getAllContratantes(req, res));
export default router;
