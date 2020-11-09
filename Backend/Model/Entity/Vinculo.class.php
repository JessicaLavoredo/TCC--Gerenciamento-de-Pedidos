<?php
    class Vinculo extends VinculoData {
        private $idVinculo;
        private $nome;

        function getIdVinculo() {return $this->idVinculo;}
        function getNome() {return $this->nome;}

        function setIdVinculo($idVinculo) {$this->idVinculo = $idVinculo;}
        function setNome($nome) {$this->nome = $nome;}

        function __construct($idVinculo=null, $nome=null) {
            parent::__construct();
            $this->setIdVinculo($idVinculo);
            $this->setNome($nome);
        }
    }
?>