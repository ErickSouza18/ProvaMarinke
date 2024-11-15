import express from "express";
import contratanteRoutes from "./routes/contratante-routes.js";
import profileRoutes from "./routes/profile-routes.js";
import jobRoutes from "./routes/job-routes.js";
import contractRoutes from "./routes/contract-routes.js";
import depositRutes from "./routes/deposit-routes.js";
import paymentRoutes from "./routes/payment-routes.js";

import sequelize from "./shared/connection.js";
import Contratante, { initializeContratante } from "./models/contratante-models.js";
import { initializeProfile } from "./models/profile-models.js";
import { initializeJob } from "./models/job-models.js";
import { initializeContract } from "./models/contract-models.js";
import { Deposit, initializeDeposit } from "./models/deposit-models.js";
import { initializePayment } from "./models/Payment-models.js";

import { Profile } from "./models/profile-models.js";
import { Job } from "./models/job-models.js";
import { Contract } from "./models/contract-models.js";
import { Payment } from "./models/Payment-models.js";

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).send("Leonardo Node API - está usando ts");
});

app.use("/contratante", contratanteRoutes);
app.use("/profile", profileRoutes);
app.use("/contract", contractRoutes);
app.use("/jobs", jobRoutes);
app.use("/deposit", depositRutes);
app.use("/payment", paymentRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Banco de dados conectado com sucesso!");

        console.log("Etapa 1");
        // Inicializar todos os modelos
        initializeProfile(sequelize);
        initializeContratante(sequelize); // Sincronizar Contratante antes
        initializeJob(sequelize);
        initializeContract(sequelize);
        initializeDeposit(sequelize);
        initializePayment(sequelize);

        console.log("Etapa 2");
        // Sincronizar tabelas
        await Profile.sync({ alter: true });
        await Contratante.sync({ alter: true });
        await Job.sync({ alter: true });
        await Contract.sync({ alter: true });
        await Deposit.sync({ alter: true });
        await Payment.sync({ alter: true });

        console.log("Modelos sincronizados com o banco de dados");

        console.log("Etapa 3");
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao conectar com o banco de dados:", error);
    }
})();





export default app;
