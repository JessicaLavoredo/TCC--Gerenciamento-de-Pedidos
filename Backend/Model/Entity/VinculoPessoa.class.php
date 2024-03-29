<?php
    class VinculoPessoa extends BaseEntity {
        private ?int $idVinculoPessoa;
        private ?int $idVinculo;
        private ?int $idPessoa;
        
        function getIdVinculoPessoa() {return $this->idVinculoPessoa;}
        function getIdVinculo() {return $this->idVinculo;}
        function getIdPessoa() {return $this->idPessoa;}

        function setIdVinculoPessoa($idVinculoPessoa) {$this->idVinculoPessoa = $idVinculoPessoa;}
        function setIdVinculo($idVinculo) {$this->idVinculo = $idVinculo;}
        function setIdPessoa($idPessoa) {$this->idPessoa = $idPessoa;}

        function __construct($idVinculoPessoa=null, $idVinculo=null, $idPessoa=null) {
            $this->setIdVinculoPessoa($idVinculoPessoa);
            $this->setIdVinculo($idVinculo);
            $this->setIdPessoa($idPessoa);
        }
    }
?>