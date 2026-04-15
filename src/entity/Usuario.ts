import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pessoa } from "./Pessoa";
import { Endereco } from "./Endereco";
import { Cartao } from "./Cartao";
import { CarrinhoCompras } from "./CarrinhoCompras";

@Entity()
export class Usuario extends Pessoa{

    @Column()
    telefone!: string;

    @OneToMany(() => Endereco, (endereco) => endereco.usuario)
    endereco!: Endereco[];

    @OneToMany(() => Cartao, (cartao) => cartao.usuario)
    cartao!: Cartao[];

    @OneToMany(() => CarrinhoCompras, (carrinhoCompras) => carrinhoCompras.usuario)
    compras!: CarrinhoCompras[];

    constructor(nome?: string, email?: string, cpf?: string){
        super(nome, email, cpf);
    }

}