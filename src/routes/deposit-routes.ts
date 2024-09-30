import { Router } from "express";
import { DepositController } from "../controllers/deposit-controller.js";

const router = Router();
const depositController = new DepositController();

router.post("/deposits", (req, res) => depositController.createDeposit(req, res));
router.get("/deposits", (req, res) => depositController.getAllDeposits(req, res));
router.get("/deposits/:id", (req, res) => depositController.getDepositById(req, res));
router.delete("/deposits/:id", (req, res) => depositController.deleteDeposit(req, res));
router.put("/deposits/:id", (req, res) => depositController.updateDeposit(req, res));

export default router;
