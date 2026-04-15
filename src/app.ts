import "reflect-metadata";
import express from 'express';
import usuarioRouter from "./router/usuario";
import produtoRouter from "./router/produto";
import estoqueRouter from "./router/estoque";
import enderecoRouter from "./router/endereco";
import cartaoRouter from "./router/cartao";
import carrinhoRouter from "./router/carrinhocompras";
import { AppDataSource } from './banco';

const app = express();
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('<h1>Sistema de vendas</h1>');
});

app.use('/usuario', usuarioRouter);
app.use('/produto', produtoRouter);
app.use('/estoque', estoqueRouter);
app.use('/endereco', enderecoRouter);
app.use('/cartao', cartaoRouter);
app.use('/carrinho', carrinhoRouter);

const porta = parseInt(process.env.APP_PORT || "3000");

AppDataSource.initialize()
    .then(() => {
        console.log("Conexão com o banco de dados efetuada com sucesso.");
        app.listen(porta, () => {
            console.log(`Servidor web rodando na porta ${porta}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao inicializar o banco de dados:", error);
        process.exit(1);
    });