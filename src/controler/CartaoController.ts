import { Cartao } from "../entity/Cartao";
import { CartaoService } from "../service/CartaoService";
import { Request, Response } from 'express';

export class CartaoController {
    private cartaoService: CartaoService;

    constructor() {
        this.cartaoService = new CartaoService();
    }

    async criarCartao(req: Request, res: Response): Promise<Response> {
        try {
            const cartao: Cartao = req.body;
            const novoCartao = await this.cartaoService.criarCartao(cartao);
            return res.status(201).json({ message: "Cartão criado com sucesso.", novoCartao });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: "Erro ao criar novo cartão.", error: error.message });
            }
            return res.status(500).json({ message: "Erro ao criar novo cartão.", error: "Erro desconhecido" });
        }
    }

    async listarCartao(req: Request, res: Response): Promise<Response> {
        try {
            const cartoes = await this.cartaoService.listarCartao();
            return res.status(200).json(cartoes)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: "Lista de cartões não encontrada.", error: error.message });
            }
            return res.status(500).json({ message: "Erro ao exibir lista de cartões.", error: "Erro desconhecido" });
        }
    }

    async editarCartao(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const cartoesAtualizados = req.body;
            await this.cartaoService.editarCartao(id, cartoesAtualizados);
            return res.status(200).json({ message: `Cartão ${id} editado com sucesso.`, cartoesAtualizados });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao editar cartão.", error: error.message });
        }
    }

    async excluirCartao(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = parseInt(req.params.id);
            const cartao = await this.cartaoService.excluirCartao(id);
            return res.status(200).json({ message: `Cartão ${id} removido com sucesso`, cartao });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao remover cartão.", erro: error.message });
        }
    }

    async pesquisarCartao(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const cartao = await this.cartaoService.pesquisarCartao(id);
            return res.status(200).json({ message: `Pesquisa ${id} realizada com sucesso`, cartao });
        } catch (error) {
            return res.status(404).json({ message: "Erro ao pesquisar cartão.", error: error.message });
        }
    }
}
