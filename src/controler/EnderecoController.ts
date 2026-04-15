import { Endereco } from "../entity/Endereco";
import { EnderecoService } from "../service/EnderecoService";
import { Request, Response} from 'express';

export class EnderecoController{
    private enderecoService: EnderecoService;

    constructor(){
        this.enderecoService = new EnderecoService();
    }

    async criarEndereco(req: Request, res: Response): Promise<Response> {
        try {
            const endereco: Endereco = req.body;
            const novoEndereco = await this.enderecoService.criarEndereco(endereco);
            return res.status(201).json({message: "Endereço criado com sucesso.", novoEndereco});
        } catch (error) {
            return res.status(400).json({message: "Erro ao criar endereço.", error: error.message});
        }
    }

    async listarEndereco(req: Request, res: Response): Promise<Response> {
        try {
            const enderecos = await this.enderecoService.listarEndereco();
            return res.status(200).json(enderecos)
        } catch (error) {
            return res.status(400).json({message: "Lista de endereços não encontrada.", error: error.message});
        }
    }

    async editarEndereco(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const enderecoAtualizados = req.body;
            await this.enderecoService.editarEndereco(id, enderecoAtualizados);
            return res.status(200).json({ message: `Endereço ${id} editado com sucesso.`, enderecoAtualizados});
        } catch (error) {
            return res.status(400).json({ message: "Erro ao editar endereço.", error: error.message});
        }
    }

    async excluirEndereco(req: Request, res: Response): Promise<Response>{
        try {
            const id: number = parseInt(req.params.id);
            const endereco = await this.enderecoService.excluirEndereco(id);
            return res.status(200).json({ message: `Endereço ${id} removido com sucesso`, endereco});
        } catch (error) {
            return res.status(400).json({ message: "Erro ao remover endereço.", erro: error.message});
        }
    }

    async pesquisarEndereco(req: Request, res: Response): Promise<Response>{
        try {
            const id = parseInt(req.params.id);
            const endereco = await this.enderecoService.pesquisarEndereco(id);
            return res.status(200).json({message: `Pesquisa ${id} realizada com sucesso`, endereco});
        } catch (error) {
            return res.status(404).json({ message: "Erro ao pesquisar endereço.", error: error.message });
        }
    }
}
