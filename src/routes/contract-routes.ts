import { Router } from "express";
import { ContractController } from "../controllers/contract-controller.js";

const router = Router();
const contractController = new ContractController();

router.post("/contracts", (req, res) => contractController.createContract(req, res));
router.get("/contracts", (req, res) => contractController.getAllContracts(req, res));
router.get("/contracts/:id", (req, res) => contractController.getContractById(req, res));
router.put("/contracts/:id", (req, res) => contractController.updateContract(req, res));
router.delete("/contracts/:id", (req, res) => contractController.deleteContract(req, res));

export default router;
