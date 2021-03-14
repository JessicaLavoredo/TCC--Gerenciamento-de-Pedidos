<?php
    class PedidoProduto extends BaseEntity {
        private $idPedidoProduto;
        private $idPedido;
        private $idProduto;
        private $preco;
        private $quantidade;
        private $desconto;
        
        function getIdPedidoProduto() {return $this->idPedidoProduto;}
        function getIdPedido() {return $this->idPedido;}
        function getIdProduto() {return $this->idProduto;}
        function getPreco() {return $this->preco;}
        function getQuantidade() {return $this->quantidade;}
        function getDesconto() {return $this->desconto;}
        function getPrecoFinal() {return ($this->preco - $this->desconto);}

        function setIdPedidoProduto($idPedidoProduto) {$this->idPedidoProduto = $idPedidoProduto;}
        function setIdPedido($idPedido) {$this->idPedido = $idPedido;}
        function setIdProduto($idProduto) {$this->idProduto = $idProduto;}
        function setPreco($preco) {$this->preco = $preco;}
        function setQuantidade($quantidade) {$this->quantidade = $quantidade;}
        function setDesconto($desconto) {$this->desconto = $desconto;}
        
        function __construct($idPedidoProduto=null, $idPedido=null, $idProduto=null, $preco=null, $quantidade=null, $desconto=null) {
            $this->setIdPedidoProduto($idPedidoProduto);
            $this->setIdPedido($idPedido);
            $this->setIdProduto($idProduto);
            $this->setPreco($preco);
            $this->setQuantidade($quantidade);
            $this->setDesconto($desconto);
        }
    }
?>