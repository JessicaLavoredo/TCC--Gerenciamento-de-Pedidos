<?php
    class Email{
        private $idEmail;
        private $idPessoa;
        private $endereco;
        private $idCategoriaEmail;
        private $observacao;

        function getIdEmail() {return $this->idEmail;}
        function getIdPessoa() {return $this->idPessoa;}
        function getEndereco() {return $this->endereco;}
        function getIdCategoriaEmail() {return $this->idCategoriaEmail;}
        function getObservacao() {return $this->observacao;}

        function setIdEmail() {$this->idEmail = $idEmail;}
        function setIdPessoa() {$this->idPessoa = $idPessoa;}
        function setEndereco() {$this->endereco = $endereco;}
        function setIdCategoriaEmail() {$this->idCategoriaEmail = $idCategoriaEmail;}
        function setObservacao() {$this->observacao = $observacao;}

        function __construct($idEmail="", $idPessoa="", $endereco="", $idCategoriaEmail="", $observacao="") {
            $this->setIdEmail($idEmail);
            $this->setIdPessoa($idPessoa);
            $this->setEndereco($endereco);
            $this->setIdCategoriaEmail($idCategoriaEmail);
            $this->setObservacao($observacao);
        }
    }
?>