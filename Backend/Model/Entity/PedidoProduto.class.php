<?php
    class PedidoProduto extends BaseEntity {
        private ?int $idPedidoProduto;
        private ?int $idPedido;
        private ?int $idProduto;
        private ?float $preco;
        private ?float $desconto;
        private ?float $precoFinal;
        private ?int $quantidade;
        
        function getIdPedidoProduto() {return $this->idPedidoProduto;}
        function getIdPedido() {return $this->idPedido;}
        function getIdProduto() {return $this->idProduto;}
        function getPreco() {return $this->preco;}
        function getDesconto() {return $this->desconto;}
        function getPrecoFinal() {return $this->precoFinal;}
        function getQuantidade() {return $this->quantidade;}

        function setIdPedidoProduto($idPedidoProduto) {$this->idPedidoProduto = $idPedidoProduto;}
        function setIdPedido($idPedido) {$this->idPedido = $idPedido;}
        function setIdProduto($idProduto) {$this->idProduto = $idProduto;}
        function setPreco($preco) {$this->preco = $preco; 
            if (isset($this->preco) && isset($this->desconto)) {
                $this->precoFinal = $this->preco - $this->desconto;
            }
        }
        function setDesconto($desconto) {$this->desconto = $desconto;
            if (isset($this->preco) && isset($this->desconto)) {
                $this->precoFinal = $this->preco - $this->desconto;
            }
        }
        function setQuantidade($quantidade) {$this->quantidade = $quantidade;}
        
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