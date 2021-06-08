
export class Pedido_Produto {
    public IdPedidoProduto: string;
    public IdPedido: string;
    public IdProduto: string;
    public Preco: string;
    public Quantidade: string;
    public Desconto: string;
    public PrecoFinal: string;

    constructor() {
        this.IdProduto = '';
        this.Preco = '';
        this.Quantidade = '';
        this.Desconto = '';
    }

}



