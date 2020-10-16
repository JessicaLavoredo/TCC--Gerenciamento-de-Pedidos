<?php
    class Parcela{
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

        function setIdParcela() {$this->idParcela = $idParcela;}
        function setOrdem() {$this->ordem = $ordem;}
        function setDias() {$this->dias = $dias;}
        function setPeso() {$this->peso = $peso;}
        function setIdFormaPagamento() {$this->idFormaPagamento = $idFormaPagamento;}

        function __construct($idParcela="", $ordem="", $dias="", $peso="", $idFormaPagamento="") {
            $this->setIdParcela($idParcela);
            $this->setOrdem($ordem);
            $this->setDias($dias);
            $this->setPeso($peso);
            $this->setIdFormaPagamento($idFormaPagamento);
        }            
    }
?>