<?php
    class ListaPreco {
        private ?int $idListaPreco;
        private ?string $descritivo;
        
        function getIdListaPreco() {return $this->idListaPreco;}
        function getDescritivo() {return $this->descritivo;}

        function setIdListaPreco($idListaPreco) {$this->idListaPreco = $idListaPreco;}
        function setDescritivo($descritivo) {$this->descritivo = $descritivo;}

        function __construct($idListaPreco=null, $descritivo=null) {
            $this->setIdListaPreco($idListaPreco);
            $this->setDescritivo($descritivo);
        }            
    }
?>