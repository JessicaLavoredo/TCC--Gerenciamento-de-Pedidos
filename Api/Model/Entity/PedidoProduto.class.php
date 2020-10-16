<?php
    class PedidoProduto{
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

        function setIdPedidoProduto() {$this->idPedidoProduto = $idPedidoProduto;}
        function setIdPedido() {$this->idPedido = $idPedido;}
        function setIdProduto() {$this->idProduto = $idProduto;}
        function setPreco() {$this->preco = $preco;}
        function setQuantidade() {$this->quantidade = $quantidade;}
        function setDesconto() {$this->desconto = $desconto;}
        
        function __construct($idPedidoProduto="", $idPedido="", $idProduto="", $preco="", $quantidade="", $desconto="") {
            $this->setIdPedidoProduto($idPedidoProduto);
            $this->setIdPedido($idPedido);
            $this->setIdProduto($idProduto);
            $this->setPreco($preco);
            $this->setQuantidade($quantidade);
            $this->setDesconto($desconto);
        }
    }
?>