var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PaymentService } from "../services/payment-service.js";
export class PaymentController {
    constructor() {
        this.paymentService = new PaymentService();
    }
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jobId, operationDate, paymentValue } = req.body;
                const newPayment = yield this.paymentService.createPayment(jobId, operationDate, paymentValue);
                return res.status(201).json(newPayment);
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao criar pagamento", error: error.message });
            }
        });
    }
    getAllPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield this.paymentService.getAllPayments();
                if (payments.length === 0) {
                    return res.status(404).json({ message: "Nenhum pagamento encontrado." });
                }
                return res.status(200).json(payments);
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao encontrar pagamentos", error });
            }
        });
    }
    getPaymentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const payment = yield this.paymentService.findById(Number(id));
                if (!payment) {
                    return res.status(404).json({ message: `Pagamento com ID ${id} não encontrado.` });
                }
                return res.status(200).json(payment);
            }
            catch (error) {
                return res.status(500).json({ message: `Erro ao buscar pagamento por ID`, error });
            }
        });
    }
    deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.paymentService.deletePayment(Number(id));
                return res.status(200).json({ message: `Pagamento com ID ${id} foi excluído com sucesso.` });
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao excluir pagamento", error });
            }
        });
    }
    updatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { jobId, profileId, operationDate, paymentValue } = req.body;
                const updatedPayment = yield this.paymentService.update(Number(id), { jobId, operationDate, paymentValue });
                if (!updatedPayment) {
                    return res.status(404).json({ message: "Pagamento não encontrado" });
                }
                return res.status(200).json({
                    message: `Pagamento com ID ${id} foi atualizado com sucesso`,
                    payment: updatedPayment
                });
            }
            catch (error) {
                return res.status(500).json({ message: "Falha ao atualizar pagamento", error });
            }
        });
    }
}
