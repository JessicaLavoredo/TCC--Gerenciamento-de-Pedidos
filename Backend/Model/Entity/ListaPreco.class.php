<?php
    class ListaPreco {
        private $idListaPreco;
        private $descritivo;
        
        function getIdListaPreco() {return $this->idListaPreco;}
        function getDescritivo() {return $this->descritivo;}

        function setIdListaPreco($idListaPreco) {$this->idListaPreco = $idListaPreco;}
        function setDescritivo($descritivo) {$this->descritivo = $descritivo;}

        function __construct($idListaPreco="", $descritivo="") {
            $this->setIdListaPreco($idListaPreco);
            $this->setDescritivo($descritivo);
        }            
    }
?>