
export class Produto_PedidoRetorno {
    public IdProduto: string;
    public CodInternoProduto: string;
    public Preco: string;
    public Quantidade: number;
    public Desconto: string;
    public Descricao: string;
    public Total: number;

    constructor() {
        this.IdProduto = '';
        this.Preco = '';
        this.Quantidade = null;
        this.Desconto = '';
        this.CodInternoProduto = '';
        this.Descricao = '';
        this.Total = null;
    }

}



