import { CarrinhoCompras } from "../entity/CarrinhoCompras";
import { CarrinhoComprasRepository } from "../repository/CarrinhoComprasRepository";
import { Produto } from "../entity/Produto";
import { Usuario } from "../entity/Usuario";

export class CarrinhoComprasService {
    private carrinhoRepository: CarrinhoComprasRepository;

    constructor() {
        this.carrinhoRepository = new CarrinhoComprasRepository();
    }

    async criarCarrinho(usuarioId: number, produto: Produto): Promise<CarrinhoCompras> {

        let carrinhoAtivo = await this.carrinhoRepository.pesquisarCarrinhoAtivoPorUsuario(usuarioId);

        if (!carrinhoAtivo) {
            carrinhoAtivo = new CarrinhoCompras();
            carrinhoAtivo.usuario = { id: usuarioId } as Usuario; 
            carrinhoAtivo.produto = [produto];
            carrinhoAtivo.status = "ativo";
            carrinhoAtivo.valorUnitario = produto.valorUnitario;
            carrinhoAtivo.quantidade = 1;
            carrinhoAtivo.valorTotal = produto.valorUnitario;
            return await this.carrinhoRepository.criarCarrinho(carrinhoAtivo);
        }

        carrinhoAtivo.produto.push(produto);
        carrinhoAtivo.quantidade += 1;
        carrinhoAtivo.valorTotal = Number(carrinhoAtivo.valorTotal) + Number(produto.valorUnitario);
        return await this.carrinhoRepository.criarCarrinho(carrinhoAtivo);
    }

    async listarCarrinho(): Promise<CarrinhoCompras[]> {
        return await this.carrinhoRepository.listarCarrinho();
    }

    async editarCarrinho(id: number, carrinhoAtualizado: Partial<CarrinhoCompras>): Promise<CarrinhoCompras | null> {
        return await this.carrinhoRepository.editarCarrinho(id, carrinhoAtualizado);
    }

    async excluirCarrinho(id: number): Promise<void> {
        await this.carrinhoRepository.excluirCarrinho(id);
    }

    async pesquisarCarrinho(id: number): Promise<CarrinhoCompras | null> {
        return await this.carrinhoRepository.pesquisarCarrinho(id);
    }
}
