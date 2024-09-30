import express from "express";
import contratanteRoutes from "./routes/contratante-routes.js";

import profileRoutes from "./routes/profile-routes.js";
import jobRoutes from "./routes/job-routes.js";
import contractRoutes from "./routes/contract-routes.js";
import depositRutes from "./routes/deposit-routes.js";
import paymentRoutes from "./routes/payment-routes.js";


import sequelize from "./shared/connection.js";
import { initializeContratante } from "./models/contratante-models.js";

import { initializeProfile } from "./models/profile-models.js";
import { initializeJob } from "./models/job-models.js";
import { initializeContract } from "./models/contract-models.js";
import { initializeDeposit } from "./models/deposit-models.js";
import { initializePayment } from "./models/Payment-models.js";


//Imports usados para a criações das tabelas se não houver 
import { Contratante } from "./models/contratante-models.js" 

import { Profile } from "./models/profile-models.js";
import { Job } from "./models/job-models.js";
import { Contract } from "./models/contract-models.js";
import { Deposit } from "./models/deposit-models.js";
import { Payment } from "./models/Payment-models.js";



const app = express();
app.use(express.json());
const PORT = 3000;


app.get("/", (req, res) => {
    res.status(200).send("Leonardo Node API - está usando ts")
});

app.use("/contratante", contratanteRoutes);

app.use("/profile", profileRoutes);
app.use("/contract", contractRoutes);
app.use("/job", jobRoutes);
app.use("/deposit", depositRutes);
app.use("/payment", paymentRoutes);



(async () => {
    try {
        await sequelize.authenticate();
        console.log("O banco de dados foi conectado com sucesso");

        
        initializeProfile(sequelize);
        initializeContract(sequelize);
        initializeJob(sequelize);
        initializeDeposit(sequelize);
        initializePayment(sequelize);

        initializeContratante(sequelize); 

        await sequelize.sync();
        console.log("Models estão sincronizados com o database");

        app.listen(PORT, () => {
            console.log("O servidor está rodando na porta:", PORT);
        });
    } catch (error) {
        console.error("Impossível conectar com o banco de dados:", error);
    }
})();

export default app;