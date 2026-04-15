import { Repository } from "typeorm";
import { Estoque } from "../entity/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { ProdutoRepository } from "../repository/ProdutoRepository";

export class EstoqueService{
    private estoqueRepository: EstoqueRepository;
    private produtoRepository: ProdutoRepository;

    constructor(){
        this.estoqueRepository = new EstoqueRepository();
        this.produtoRepository = new ProdutoRepository();
    }

    async criarEstoque(estoque: Estoque, produtoId: number): Promise<Estoque>{
        const produto = await this.produtoRepository.pesquisarProduto(produtoId);

        if (!produto) {
            throw new Error("Produto não encontrado")
        }

        const novoEstoque = await this.estoqueRepository.criarEstoque(estoque);
        await this.produtoRepository.editarProduto(produto.id, { estoque: novoEstoque });
        return novoEstoque;
    }

    async listarEstoque(): Promise<Estoque[]>{
        return await this.estoqueRepository.listarEstoque();
    }

    async editarEstoque(id: number, estoqueAtualizado: Partial<Estoque>): Promise<Estoque | null> {
        return await this.estoqueRepository.editarEstoque(id, estoqueAtualizado);
    }

    async excluirEstoque(id: number): Promise<void>{
        await this.estoqueRepository.excluirEstoque(id);
    }

    async pesquisarEstoque(id: number): Promise<Estoque | null> {
        return await this.estoqueRepository.pesquisarEstoque(id);
    }
}