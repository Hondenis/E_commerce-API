import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "./Produto";

@Entity()
export class Estoque{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quantidadeEmEstoque: number;

    @OneToMany(() => Produto, (produto) => produto.estoque)
    produto!: Produto[];

    constructor(quantidadeEmEstoque?: number){
        this.quantidadeEmEstoque = quantidadeEmEstoque ?? 0;
    }

    
}