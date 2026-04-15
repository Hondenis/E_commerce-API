import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estoque } from "./Estoque";
import { CarrinhoCompras } from "./CarrinhoCompras";

@Entity()
export class Produto{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column()
    marca: string;

    @Column()
    modelo: string;

    @Column()
    tamanho: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valorUnitario: number;

    @ManyToOne(() => Estoque, (estoque) => estoque.produto)
    estoque!: Estoque;

    @ManyToMany(() => CarrinhoCompras, (carrinhoCompras) => carrinhoCompras.produto)
    carrinhoCompras!: CarrinhoCompras[];

    constructor(nome?: string, marca?: string, modelo?: string, tamanho?: number, valorUnitario?: number){
        this.nome = nome ?? "";
        this.marca = marca ?? "";
        this.modelo = modelo ?? "";
        this.tamanho = tamanho ?? 0;
        this.valorUnitario = valorUnitario ?? 0;
    }

}