import { Router } from "express";
import {ContratanteController} from "../controllers/contratante-controllers.js"

const router = Router();
const contratanteController = new ContratanteController();

router.post("/contratantes" , (req, res) => contratanteController.createContratante(req,res));
router.get("/contratantes", (req, res) => contratanteController.getAllContratantes(req,res));

export default router;