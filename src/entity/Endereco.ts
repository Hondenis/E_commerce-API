import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Endereco{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nomeRua: string;

    @Column()
    numeroCasa: number;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @Column()
    cep: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.endereco)
    usuario!: Usuario;

    constructor(nomeRua?: string, numeroCasa?: number, bairro?: string, cidade?: string, estado?: string, cep?: string){
        this.nomeRua = nomeRua ?? "";
        this.numeroCasa = numeroCasa ?? 0;
        this.bairro = bairro ?? "";
        this.cidade = cidade ?? "";
        this.estado = estado ?? "";
        this.cep = cep ?? "";
    }
}