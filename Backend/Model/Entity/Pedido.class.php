<?php
    class Pedido extends BaseEntity {
        private ?int $idPedido;
        private ?int $idPessoa;
        private ?int $idFormaPagamento;
        private ?int $idStatus;
        private ?float $total;
        private Array $produtos;
        
        function getIdPedido() {return $this->idPedido;}
        function getIdPessoa() {return $this->idPessoa;}
        function getIdFormaPagamento() {return $this->idFormaPagamento;}
        function getIdStatus() {return $this->idStatus;}
        function getTotal() {return array_reduce($this->produtos, function($total, $produto){ return $total + $produto->getPrecoFinal();}, 0.00);}
        function getProdutos() {return $this->produtos;}

        function setIdPedido($idPedido) {$this->idPedido = $idPedido;}
        function setIdPessoa($idPessoa) {$this->idPessoa = $idPessoa;}
        function setIdFormaPagamento($idFormaPagamento) {$this->idFormaPagamento = $idFormaPagamento;}
        function setIdStatus($idStatus) {$this->idStatus = $idStatus;}
        function setProdutos($produtos) {
            $this->produtos = array();
            if(isset($produtos)){
                foreach($produtos as $prod){
                    $prod = Funcoes::objetoParaArray($prod);
                    $entidade = Funcoes::criarEntidade("PedidoProduto", $prod);
                    $this->addProduto($entidade);
                }
            }
        }
        private function addProduto(PedidoProduto $produto){
            $this->produtos[] = $produto;
        }

        function __construct($idPedido=null, $idPessoa=null, $idFormaPagamento=null, $idStatus=null, $produtos=null) {
            $this->setIdPedido($idPedido);
            $this->setIdPessoa($idPessoa);
            $this->setIdFormaPagamento($idFormaPagamento);
            $this->setIdStatus($idStatus);
            $this->setProdutos($produtos);
        }
    }
?>