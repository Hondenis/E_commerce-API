import { Repository } from "typeorm";
import { AppDataSource } from "../banco";
import { Endereco } from "../entity/Endereco";

export class EnderecoRepository{
    private repositorioEndereco: Repository<Endereco>;

    constructor(){
        this.repositorioEndereco = AppDataSource.getRepository(Endereco);
    }

    async criarEndereco(endereco: Endereco): Promise<Endereco>{
        return await this.repositorioEndereco.save(endereco);
    }

    async listarEndereco(): Promise<Endereco[]>{
        return await this.repositorioEndereco.find();
    }

    async editarEndereco(id: number, enderecoAtualizado: Partial<Endereco>): Promise<Endereco | null>{
        const endereco = await this.repositorioEndereco.findOne({ where: {id}});
        if(!endereco){
            throw new Error("Endereço não encontrado.")
        }
        Object.assign(endereco, enderecoAtualizado);
        return await this.repositorioEndereco.save(endereco);
    }

    async excluirEndereco(id: number): Promise<void>{
        const endereco = await this.repositorioEndereco.findOne({ where: {id}})
        if(!endereco){
            throw new Error("Endereço não encontrado.");
        }
        await this.repositorioEndereco.remove(endereco);
    }

    async pesquisarEndereco(id: number): Promise<Endereco | null>{
        return await this.repositorioEndereco.findOne({ where: {id}});
    }
    
}
