import { Cartao } from "../entity/Cartao";
import { Usuario } from "../entity/Usuario";
import { CartaoRepository } from "../repository/CartaoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class CartaoService{
    private cartaoRepository: CartaoRepository;
    private usuarioRepository: UsuarioRepository;

    constructor(){
        this.cartaoRepository = new CartaoRepository();
        this.usuarioRepository = new UsuarioRepository();
    }

    async criarCartao(cartao: Cartao): Promise<Cartao>{
        const usuario = await this.usuarioRepository.pesquisarUsuario(cartao.usuario.id);

        if (!usuario) {
            throw new Error("Usuario não encontrado.");
        }

        cartao.usuario = usuario;
        
        return await this.cartaoRepository.criarCartao(cartao);
    }

    async listarCartao(): Promise<Cartao[]>{
        return await this.cartaoRepository.listarCartao();
    }

    async editarCartao(id: number, cartaoAtualizado: Partial<Cartao>): Promise<Cartao | null> {
        return await this.cartaoRepository.editarCartao(id, cartaoAtualizado);
    }

    async excluirCartao(id: number): Promise<void>{
        await this.cartaoRepository.excluirCartao(id);
    }

    async pesquisarCartao(id: number): Promise<Cartao | null> {
        return await this.cartaoRepository.pesquisarCartao(id);
    }
}