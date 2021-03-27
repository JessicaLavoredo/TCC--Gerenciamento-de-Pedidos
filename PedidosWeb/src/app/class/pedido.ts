import { Produto_Pedido } from './Produto_Pedido';

export class Pedido {
    public idPedido: string;
    public idPessoa: string;
    public idFormaPagamento: string;
    public dataPedido: Date;
    public idUsuarioMovimentacao: string;
    public Produto_Pedido: Produto_Pedido[];

    constructor() {
        this.idPessoa = '';
        this.idPedido = '';
        this.idFormaPagamento = '';
        this.idUsuarioMovimentacao = '';
        this.Produto_Pedido = [];
        this.dataPedido = new Date;
    }
}



