import {Column,Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Cartao{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    numero: string;

    @Column()
    cvv: number;

    @Column()
    dataValidade: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.cartao)
    usuario!: Usuario;

    constructor(numero?: string, cvv?: number, dataValidade?: Date){
        this.numero = numero ?? "";
        this.cvv = cvv ?? 0;
        this.dataValidade = dataValidade ?? new Date();
    }
}