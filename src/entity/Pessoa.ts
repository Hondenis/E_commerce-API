import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Pessoa{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    cpf: string;

    @Column()
    dataNascimento: Date

    constructor(nome?: string, email?: string, cpf?: string, dataNascimento?: Date){
        this.nome = nome ?? "";
        this.email = email ?? "";
        this.cpf = cpf ?? "";
        this.dataNascimento = dataNascimento ?? new Date();
    }

}