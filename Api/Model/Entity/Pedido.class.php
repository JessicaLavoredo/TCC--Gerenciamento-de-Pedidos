<?php
    class Pedido{
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

        function setIdPedido() {$this->idPedido = $idPedido;}
        function setIdPessoa() {$this->idPessoa = $idPessoa;}
        function setIdFormaPagamento() {$this->idFormaPagamento = $idFormaPagamento;}
        function setDataPedido() {$this->dataPedido = $dataPedido;}
        function setIdStatusPedido() {$this->idStatusPedido = $idStatusPedido;}
        function setIdUsuarioCriadoPor() {$this->idUsuarioCriadoPor = $idUsuarioCriadoPor;}
        
        function __construct($idPedido="", $idPessoa="", $idFormaPagamento="", $dataPedido="", $idStatusPedido="", $idUsuarioCriadoPor="") {
            $this->setIdPedido($idPedido);
            $this->setIdPessoa($idPessoa);
            $this->setIdFormaPagamento($idFormaPagamento);
            $this->setDataPedido($dataPedido);
            $this->setIdStatusPedido($idStatusPedido);
            $this->setIdUsuarioCriadoPor($idUsuarioCriadoPor);
        }
    }
?>