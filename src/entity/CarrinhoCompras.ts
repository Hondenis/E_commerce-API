import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";
import { Produto } from "./Produto";

@Entity()
export class CarrinhoCompras{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valorUnitario: number;

    @Column()
    quantidade: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valorTotal: number;

    @Column({default: "Ativo"})
    status!: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.compras)
    usuario!: Usuario;
    
    @ManyToMany(() => Produto, (produto) => produto.carrinhoCompras)
    @JoinTable()
    produto!: Produto[];

    constructor(valorUnitario?: number, quantidade?: number, valorTotal?: number){
        this.valorUnitario = valorUnitario ?? 0;
        this.quantidade = quantidade ?? 0;
        this.valorTotal = valorTotal ?? 0;
    }
}