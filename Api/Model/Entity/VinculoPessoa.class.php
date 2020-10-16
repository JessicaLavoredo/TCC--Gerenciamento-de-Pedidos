<?php
    class VinculoPessoa{
        private $idVinculoPessoa;
        private $idVinculo;
        private $idPessoa;
        
        function getIdVinculoPessoa() {return $this->idVinculoPessoa;}
        function getIdVinculo() {return $this->idVinculo;}
        function getIdPessoa() {return $this->idPessoa;}

        function setIdVinculoPessoa() {$this->idVinculoPessoa = $idVinculoPessoa;}
        function setIdVinculo() {$this->idVinculo = $idVinculo;}
        function setIdPessoa() {$this->idPessoa = $idPessoa;}

        function __construct($idVinculoPessoa="", $idVinculo="", $idPessoa="") {
            $this->setIdVinculoPessoa($idVinculoPessoa);
            $this->setIdVinculo($idVinculo);
            $this->setIdPessoa($idPessoa);
        }
    }
?>