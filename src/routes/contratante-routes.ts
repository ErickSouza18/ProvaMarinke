import { Router } from "express";
import { ContratanteController } from "../controllers/contratante-controllers.js"

const router = Router();
const contratanteController = new ContratanteController();

router.post("/contratantes", (req, res) => contratanteController.createContratante(req, res));
router.get("/contratantes", (req, res) => contratanteController.getAllContratante(req, res));
router.get("/contratantes/:id", (req, res) => contratanteController.getContratanteById(req, res));
router.delete("/contratantes/:id", (req, res) => contratanteController.deleteContratante(req, res));


export default router; 
