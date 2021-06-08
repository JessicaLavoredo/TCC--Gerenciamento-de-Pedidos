import { Pedido_Produto } from './pedido_produto';
import { Pessoa } from './Pessoa';


export class Pedido {
    public IdPedido: string;
    public Pessoa: Pessoa;
    public IdFormaPagamento: string;
    public DataPedido: Date;
    public IdUsuarioMovimentacao: string;
    public Pedido_Produto: Pedido_Produto[];


    constructor() {
        this.IdPedido = '';
        this.IdFormaPagamento = '';
        this.IdUsuarioMovimentacao = '';
        this.Pedido_Produto = [];
        this.DataPedido = new Date;
        this.Pessoa = new Pessoa;
    }
}



