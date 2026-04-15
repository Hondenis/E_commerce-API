import { ProdutoService } from "../service/ProdutoService";
import { Produto } from "../entity/Produto";
import { Request, Response } from "express";

export class ProdutoController {
    private produtoService: ProdutoService;

    constructor() {
        this.produtoService = new ProdutoService();
    }

    async criarProduto(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, marca, modelo, tamanho, valorUnitario, estoqueId } = req.body; 
            const produto = new Produto(nome, marca, modelo, tamanho, valorUnitario);
            const novoProduto = await this.produtoService.criarProduto(produto, estoqueId);
            return res.status(201).json({message: `Produto criado com sucesso`, novoProduto});
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar produto.", error: error.message });
        }
    }

    async listarProduto(req: Request, res: Response): Promise<Response> {
        try{
            const produtos = await this.produtoService.listarProduto();
            return res.status(200).json({message: "Lista de produtos gerados com sucesso.", produtos});
        } catch (error) {
            return res.status(500).json({ message: "Erro ao exibir lista de produtos.", error: error.message});
        }
    }

    async editarProduto(req: Request, res: Response): Promise<Response> {
        try {  
            const id = parseInt(req.params.id);
            const produtosAtualizados = req.body;
            await this.produtoService.editarProduto(id, produtosAtualizados);
            return res.status(200).json({ message: `Produto com ID ${id} atualizado com sucesso.`, produtosAtualizados});
        } catch (error) {
            return res.status(400).json({ message: "Erro ao atualizar produto.", error: error.message});
        }
    }

    async excluirProduto(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const produto = await this.produtoService.excluirProduto(id);
            return res.status(200).send({ message: `Produto ${id} removido com sucesso.`, produto});
        } catch (error) {
            return res.status(404).json({message: "Erro ao remover produto", erro: error.message });
        }
    }

    async pesquisarProduto(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const produto = await this.produtoService.pesquisarProduto(id);
            return res.status(200).json({ message: `Pesquisa ${id} realizada com sucesso `, produto});
        } catch (error) {
            return res.status(404).json({ message: "Erro ao pesquisar produto",error: error.message });
        }
    }
}
