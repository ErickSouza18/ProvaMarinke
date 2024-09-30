import { Router } from "express";
import { PaymentController } from "../controllers/payment-controller.js";
const router = Router();
const paymentController = new PaymentController();

router.post("/payments", (req, res) => paymentController.createPayment(req, res));
router.get("/payments", (req, res) => paymentController.getAllPayments(req, res));
router.get("/payments/:id", (req, res) => paymentController.getPaymentById(req, res));
router.delete("/payments/:id", (req, res) => paymentController.deletePayment(req, res));
router.put("/payments/:id", (req, res) => paymentController.updatePayment(req, res));

export default router;
