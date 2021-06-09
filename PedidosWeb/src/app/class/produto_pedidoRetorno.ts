
export class Produto_PedidoRetorno {
    public IdProduto: string;
    public CodInternoProduto: string;
    public Preco: string;
    public Quantidade: string;
    public Desconto: string;
    public Descricao: string;
    public PrecoFinal: string;
    public IdPedidoProduto: string;
    public IdPedido: string;

    constructor() {
        this.IdProduto = '';
        this.Preco = '';
        this.Quantidade = null;
        this.Desconto = '';
        this.CodInternoProduto = '';
        this.Descricao = '';
        this.PrecoFinal = '';
        this.IdPedidoProduto = null;
        this.IdPedido = '';
    }

}



