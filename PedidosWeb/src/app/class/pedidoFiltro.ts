import { Pedido_Produto } from './pedido_produto';
import { Pessoa } from './Pessoa';


export class PedidoFiltro {
    public IdPedido: string;
    public IdFormaPagamento: string;
    public DataPedido: Date;
    public IdUsuarioMovimentacao: string;
    public Produtos: Pedido_Produto[];
    public IdPessoa: string;
    public IdStatusPedido: string;

    constructor() {
        this.IdPedido = '';
        this.IdFormaPagamento = '';
        this.IdUsuarioMovimentacao = '';
        this.Produtos = [];
        this.DataPedido = new Date;
        this.IdPessoa = '';
        this.IdStatusPedido = "1";
    }
}



