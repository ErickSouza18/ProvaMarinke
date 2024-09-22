import express from "express";
import contratanteRoutes from "./routes/contratante-routes.js";
import sequelize from "./shared/connection.js";
import { initializeContratante } from "./models/contratante-models.js"; 
import { Contratante } from "./models/contratante-models.js" //É apenas usadon se necessario, não remover 

const app = express();
app.use(express.json());
const PORT = 3000;

// Rotas

app.get("/", (req, res) => {
    res.status(200).send("Leonardo Node API - está usando ts")
});

app.use("/", contratanteRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("O banco de dados foi conectado com sucesso");

        initializeContratante(sequelize); // Inicializa o modelo

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