<?php
    class VinculoPessoa{
        private $idVinculoPessoa;
        private $idVinculo;
        private $idPessoa;
        
        function getIdVinculoPessoa() {return $this->idVinculoPessoa;}
        function getIdVinculo() {return $this->idVinculo;}
        function getIdPessoa() {return $this->idPessoa;}

        function setIdVinculoPessoa($idVinculoPessoa) {$this->idVinculoPessoa = $idVinculoPessoa;}
        function setIdVinculo($idVinculo) {$this->idVinculo = $idVinculo;}
        function setIdPessoa($idPessoa) {$this->idPessoa = $idPessoa;}

        function __construct($idVinculoPessoa="", $idVinculo="", $idPessoa="") {
            $this->setIdVinculoPessoa($idVinculoPessoa);
            $this->setIdVinculo($idVinculo);
            $this->setIdPessoa($idPessoa);
        }
    }
?>