<?php
    class Parcela extends ParcelaData {
        private $idParcela;
        private $ordem;
        private $dias;
        private $peso;
        private $idFormaPagamento;
        
        function getIdParcela() {return $this->idParcela;}
        function getOrdem() {return $this->ordem;}
        function getDias() {return $this->dias;}
        function getPeso() {return $this->peso;}
        function getIdFormaPagamento() {return $this->idFormaPagamento;}

        function setIdParcela($idParcela) {$this->idParcela = $idParcela;}
        function setOrdem($ordem) {$this->ordem = $ordem;}
        function setDias($dias) {$this->dias = $dias;}
        function setPeso($peso) {$this->peso = $peso;}
        function setIdFormaPagamento($idFormaPagamento) {$this->idFormaPagamento = $idFormaPagamento;}

        function __construct($idParcela="", $ordem="", $dias="", $peso="", $idFormaPagamento="") {
            parent::__construct();
            $this->setIdParcela($idParcela);
            $this->setOrdem($ordem);
            $this->setDias($dias);
            $this->setPeso($peso);
            $this->setIdFormaPagamento($idFormaPagamento);
        }            
    }
?>