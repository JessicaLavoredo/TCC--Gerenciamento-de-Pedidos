<?php
    class Pedido extends BaseEntity {
        private $idPedido;
        private $idPessoa;
        private $idFormaPagamento;
        private $dataPedido;
        private $idUsuarioMovimentacao;
        private Array $produtos;
        
        function getIdPedido() {return $this->idPedido;}
        function getIdPessoa() {return $this->idPessoa;}
        function getIdFormaPagamento() {return $this->idFormaPagamento;}
        function getDataPedido() {return $this->dataPedido;}
        function getIdUsuarioMovimentacao() {return $this->idUsuarioMovimentacao;}
        function getProdutos() {return $this->produtos;}

        function setIdPedido($idPedido) {$this->idPedido = $idPedido;}
        function setIdPessoa($idPessoa) {$this->idPessoa = $idPessoa;}
        function setIdFormaPagamento($idFormaPagamento) {$this->idFormaPagamento = $idFormaPagamento;}
        function setDataPedido($dataPedido) {$this->dataPedido = $dataPedido;}
        function setIdUsuarioMovimentacao($idUsuarioMovimentacao) {$this->idUsuarioMovimentacao = $idUsuarioMovimentacao;}
        
        private function addProduto(PedidoProduto $produto){
            $this->produtos[] = $produto;
        }
        function setProdutos($produtos) {
            $this->produtos = array();
            if(isset($produtos)){
                foreach($produtos as $prod){
                    $entidade = Funcoes::criarEntidade("PedidoProduto", $prod);
                    $this->addProduto($entidade);
                }
            }
        }

        function __construct($idPedido=null, $idPessoa=null, $idFormaPagamento=null, $dataPedido=null, $idStatusPedido=null, $idUsuarioMovimentacao=null, $produtos=null) {
            $this->setIdPedido($idPedido);
            $this->setIdPessoa($idPessoa);
            $this->setIdFormaPagamento($idFormaPagamento);
            $this->setDataPedido($dataPedido);
            $this->setIdUsuarioMovimentacao($idUsuarioMovimentacao);
            $this->setProdutos($produtos);
        }
    }
?>