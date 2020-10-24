<?php
    class HistoricoPedido extends HistoricoPedidoData {
        private $idHistoricoPedido;
        private $idPedido;
        private $idStatusPedido;
        private $dataMovimentacao;
        private $idUsuarioMovimentadoPor;
        
        function getIdHistoricoPedido() {return $this->idHistoricoPedido;}
        function getIdPedido() {return $this->idPedido;}
        function getIdStatusPedido() {return $this->idStatusPedido;}
        function getDataMovimentacao() {return $this->dataMovimentacao;}
        function getIdUsuarioMovimentadoPor() {return $this->idUsuarioMovimentadoPor;}

        function setIdHistoricoPedido($idHistoricoPedido) {$this->idHistoricoPedido = $idHistoricoPedido;}
        function setIdPedido($idPedido) {$this->idPedido = $idPedido;}
        function setIdStatusPedido($idStatusPedido) {$this->idStatusPedido = $idStatusPedido;}
        function setDataMovimentacao($dataMovimentacao) {$this->dataMovimentacao = $dataMovimentacao;}
        function setIdUsuarioMovimentadoPor($idUsuarioMovimentadoPor) {$this->idUsuarioMovimentadoPor = $idUsuarioMovimentadoPor;}

        function __construct($idHistoricoPedido="", $idPedido="", $idStatusPedido="", $dataMovimentacao="", $idUsuarioMovimentadoPor="") {
            $this->setIdHistoricoPedido($idHistoricoPedido);
            $this->setIdPedido($idPedido);
            $this->setIdStatusPedido($idStatusPedido);
            $this->setDataMovimentacao($dataMovimentacao);
            $this->setIdUsuarioMovimentadoPor($idUsuarioMovimentadoPor);
        }
    }
?>