<?php
    class Endereco extends EnderecoData {
        private $idEndereco;
        private $idPessoa;
        private $cep;
        private $logradouro;
        private $bairro;
        private $idCidade;
        private $idCategoriaEndereco;
        private $observacao;
        
        function getIdEndereco() {return $this->idEndereco;}
        function getIdPessoa() {return $this->idPessoa;}
        function getCEP() {return $this->cep;}
        function getLogradouro() {return $this->logradouro;}
        function getBairro() {return $this->bairro;}
        function getIdCidade() {return $this->idCidade;}
        function getIdCategoriaEndereco() {return $this->idCategoriaEndereco;}
        function getObservacao() {return $this->observacao;}

        function setIdEndereco($idEndereco) {$this->idEndereco = $idEndereco;}
        function setIdPessoa($idPessoa) {$this->idPessoa = $idPessoa;}
        function setCEP($cep) {$this->cep = $cep;}
        function setLogradouro($logradouro) {$this->logradouro = $logradouro;}
        function setBairro($bairro) {$this->bairro = $bairro;}
        function setIdCidade($idCidade) {$this->idCidade = $idCidade;}
        function setIdCategoriaEndereco($idCategoriaEndereco) {$this->idCategoriaEndereco = $idCategoriaEndereco;}
        function setObservacao($observacao) {$this->observacao = $observacao;}

        function __construct($idEndereco="", $idPessoa="", $cep="", $logradouro="", $bairro="", $idCidade="", $idCategoriaEndereco="", $observacao="") {
            $this->setIdEndereco($idEndereco);
            $this->setIdPessoa($idPessoa);
            $this->setCEP($cep);
            $this->setLogradouro($logradouro);
            $this->setBairro($bairro);
            $this->setIdCidade($idCidade);
            $this->setIdCategoriaEndereco($idCategoriaEndereco);
            $this->setObservacao($observacao);
        }
            
    }
?>