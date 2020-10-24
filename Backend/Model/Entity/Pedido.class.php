<?php
    class Pedido extends PedidoData {
        private $idPedido;
        private $idPessoa;
        private $idFormaPagamento;
        private $dataPedido;
        private $idStatusPedido;
        private $idUsuarioCriadoPor;
        
        function getIdPedido() {return $this->idPedido;}
        function getIdPessoa() {return $this->idPessoa;}
        function getIdFormaPagamento() {return $this->idFormaPagamento;}
        function getDataPedido() {return $this->dataPedido;}
        function getIdStatusPedido() {return $this->idStatusPedido;}
        function getIdUsuarioCriadoPor() {return $this->idUsuarioCriadoPor;}

        function setIdPedido($idPedido) {$this->idPedido = $idPedido;}
        function setIdPessoa($idPessoa) {$this->idPessoa = $idPessoa;}
        function setIdFormaPagamento($idFormaPagamento) {$this->idFormaPagamento = $idFormaPagamento;}
        function setDataPedido($dataPedido) {$this->dataPedido = $dataPedido;}
        function setIdStatusPedido($idStatusPedido) {$this->idStatusPedido = $idStatusPedido;}
        function setIdUsuarioCriadoPor($idUsuarioCriadoPor) {$this->idUsuarioCriadoPor = $idUsuarioCriadoPor;}
        
        function __construct($idPedido="", $idPessoa="", $idFormaPagamento="", $dataPedido="", $idStatusPedido="", $idUsuarioCriadoPor="") {
            parent::__construct();
            $this->setIdPedido($idPedido);
            $this->setIdPessoa($idPessoa);
            $this->setIdFormaPagamento($idFormaPagamento);
            $this->setDataPedido($dataPedido);
            $this->setIdStatusPedido($idStatusPedido);
            $this->setIdUsuarioCriadoPor($idUsuarioCriadoPor);
        }
    }
?>