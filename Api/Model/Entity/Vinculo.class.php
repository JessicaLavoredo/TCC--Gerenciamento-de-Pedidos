<?php
    class Vinculo{
        private $idVinculo;
        private $nome;

        function getIdVinculo() {return $this->idVinculo;}
        function getNome() {return $this->nome;}

        function setIdVinculo() {$this->idVinculo = $idVinculo;}
        function setNome() {$this->nome = $nome;}

        function __construct($idVinculo="", $nome="") {
            $this->setIdVinculo($idVinculo);
            $this->setNome($nome);
        }
    }
?>