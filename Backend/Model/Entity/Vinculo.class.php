<?php
    class Vinculo extends VinculoData {
        private $idVinculo;
        private $nome;

        function getIdVinculo() {return $this->idVinculo;}
        function getNome() {return $this->nome;}

        function setIdVinculo($idVinculo) {$this->idVinculo = $idVinculo;}
        function setNome($nome) {$this->nome = $nome;}

        function __construct($idVinculo="", $nome="") {
            $this->setIdVinculo($idVinculo);
            $this->setNome($nome);
        }
    }
?>