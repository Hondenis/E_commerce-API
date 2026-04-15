import { Repository } from "typeorm";
import { AppDataSource } from "../banco";
import { Cartao } from "../entity/Cartao";

export class CartaoRepository{
    private repositorioCartao: Repository<Cartao>;

    constructor(){
        this.repositorioCartao = AppDataSource.getRepository(Cartao);
    }

    async criarCartao(cartao: Cartao): Promise<Cartao>{
        return await this.repositorioCartao.save(cartao)
    }

    async listarCartao(): Promise<Cartao[]>{
        return await this.repositorioCartao.find({ relations: ["usuario"] });
    }

    async editarCartao(id: number, cartaoAtualizado: Partial<Cartao>): Promise<Cartao | null>{
        const cartao = await this.repositorioCartao.findOne({ where: {id}});
        if(!cartao){
            throw new Error("Cartao não encontrado.");
        }
        Object.assign(cartao, cartaoAtualizado);
        return await this.repositorioCartao.save(cartao);
    }

    async excluirCartao(id: number): Promise<void>{
        const cartao = await this.repositorioCartao.findOne({ where: {id}});
        if(!cartao){
            throw new Error("Cartão não encontrado.");
        }
        await this.repositorioCartao.remove(cartao);
    }

    async pesquisarCartao(id: number): Promise<Cartao | null>{
        return await this.repositorioCartao.findOne({where: {id}});
    }
}