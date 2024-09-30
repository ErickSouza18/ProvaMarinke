import { Payment, PaymentCreationAttributes } from "../models/Payment-models.js";

export class PaymentRepository {
    public async create(data: PaymentCreationAttributes): Promise<Payment> {
        try {
            return await Payment.create(data);
        } catch (error) {
            throw new Error(`Impossível criar pagamento: ${(error as Error).message}`);
        }
    }

    public async findAll(): Promise<Payment[]> {
        try {
            return await Payment.findAll();
        } catch (error) {
            throw new Error(`Impossível encontrar pagamentos: ${(error as Error).message}`);
        }
    }

    public async findById(id: number): Promise<Payment | null> {
        try {
            return await Payment.findByPk(id);
        } catch (error) {
            throw new Error(`Impossível encontrar pagamento pelo ID ${id}: ${(error as Error).message}`);
        }
    }

    public async update(id: number, data: Partial<PaymentCreationAttributes>): Promise<Payment | null> {
        try {
            const payment = await Payment.findByPk(id);
            if (!payment) {
                throw new Error(`Pagamento com ID ${id} não encontrado`);
            }
            await payment.update(data);
            return payment;
        } catch (error) {
            throw new Error(`Impossível atualizar pagamento com ID ${id}: ${(error as Error).message}`);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            const result = await Payment.destroy({ where: { id } });
            if (result === 0) {
                throw new Error(`Pagamento com ID ${id} não encontrado`);
            }
        } catch (error) {
            throw new Error(`Impossível excluir pagamento com ID ${id}: ${(error as Error).message}`);
        }
    }
}
