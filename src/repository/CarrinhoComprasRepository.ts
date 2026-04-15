import { Repository } from "typeorm";
import { CarrinhoCompras } from "../entity/CarrinhoCompras";
import { AppDataSource } from "../banco";

export class CarrinhoComprasRepository{
    private repositorioCarrinhoCompras: Repository<CarrinhoCompras>;

    constructor(){
        this.repositorioCarrinhoCompras = AppDataSource.getRepository(CarrinhoCompras);
    }
    async criarCarrinho(carrinhoCompras: CarrinhoCompras): Promise<CarrinhoCompras>{
        return await this.repositorioCarrinhoCompras.save(carrinhoCompras);
    }

    async listarCarrinho(): Promise<CarrinhoCompras[]>{
        return await this.repositorioCarrinhoCompras.find();
    }

    async editarCarrinho(id: number, carrinhoAtualizado: Partial<CarrinhoCompras>): Promise<CarrinhoCompras | null>{
        const carrinho = await this.repositorioCarrinhoCompras.findOne({
            where: { id },
            relations: ["produto"]
        });
        if(!carrinho){
            throw new Error("Carrinho não encontrado.");
        }
        const { produto, ...dadosRestantes } = carrinhoAtualizado;
        Object.assign(carrinho, dadosRestantes);
        if (produto !== undefined) {
            carrinho.produto = produto;
        }
        return await this.repositorioCarrinhoCompras.save(carrinho);
    }

    async excluirCarrinho(id: number): Promise<void>{
        const carrinho = await this.repositorioCarrinhoCompras.findOne({where: {id}});
        if(!carrinho){
            throw new Error("Carrinho não encontrado.");
        }
        await this.repositorioCarrinhoCompras.remove(carrinho);
    }

    async pesquisarCarrinho(id: number): Promise<CarrinhoCompras | null> {
        return await this.repositorioCarrinhoCompras.findOne( { where: {id}});
    }

    async pesquisarCarrinhoAtivoPorUsuario(usuarioId: number): Promise<CarrinhoCompras | null>{
        return await this.repositorioCarrinhoCompras.findOne({
            where: { usuario: { id: usuarioId }, status: "ativo"},
            relations: ["produto"],
        })
    }
    
}