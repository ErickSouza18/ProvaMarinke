var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import contratanteRoutes from "./routes/contratante-routes.js";
import sequelize from "./shared/connection.js";
import { initializeContratante } from "./models/contratante-models.js";
const app = express();
app.use(express.json());
const PORT = 3000;
// Rotas
app.get("/", (req, res) => {
    res.status(200).send("Leonardo Node API - está usando ts");
});
app.use("/", contratanteRoutes);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log("O banco de dados foi conectado com sucesso");
        initializeContratante(sequelize); // Inicializa o modelo
        yield sequelize.sync();
        console.log("Models estão sincronizados com o database");
        app.listen(PORT, () => {
            console.log("O servidor está rodando na porta:", PORT);
        });
    }
    catch (error) {
        console.error("Impossível conectar com o banco de dados:", error);
    }
}))();
export default app;
