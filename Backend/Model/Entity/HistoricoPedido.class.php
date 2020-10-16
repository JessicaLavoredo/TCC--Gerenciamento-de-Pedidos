<?php
    class HistoricoPedido{
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

        function setIdHistoricoPedido() {$this->idHistoricoPedido = $idHistoricoPedido;}
        function setIdPedido() {$this->idPedido = $idPedido;}
        function setIdStatusPedido() {$this->idStatusPedido = $idStatusPedido;}
        function setDataMovimentacao() {$this->dataMovimentacao = $dataMovimentacao;}
        function setIdUsuarioMovimentadoPor() {$this->idUsuarioMovimentadoPor = $idUsuarioMovimentadoPor;}

        function __construct($idHistoricoPedido="", $idPedido="", $idStatusPedido="", $dataMovimentacao="", $idUsuarioMovimentadoPor="") {
            $this->setIdHistoricoPedido($idHistoricoPedido);
            $this->setIdPedido($idPedido);
            $this->setIdStatusPedido($idStatusPedido);
            $this->setDataMovimentacao($dataMovimentacao);
            $this->setIdUsuarioMovimentadoPor($idUsuarioMovimentadoPor);
        }
    }
?>