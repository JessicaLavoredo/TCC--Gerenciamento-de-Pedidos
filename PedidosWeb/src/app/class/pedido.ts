import { Produto_Pedido } from './Produto_Pedido';

export class Pedido {
    public IdPedido: string;
    public IdPessoa: string;
    public IdFormaPagamento: string;
    public DataPedido: Date;
    public IdUsuarioMovimentacao: string;
    public Produto_Pedido: Produto_Pedido[];

    constructor() {
        this.IdPessoa = '';
        this.IdPedido = '';
        this.IdFormaPagamento = '';
        this.IdUsuarioMovimentacao = '';
        this.Produto_Pedido = [];
        this.DataPedido = new Date;
    }
}



