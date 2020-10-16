<?php
    class Endereco {
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

        function setIdEndereco() {$this->idEndereco = $idEndereco;}
        function setIdPessoa() {$this->idPessoa = $idPessoa;}
        function setCEP() {$this->cep = $cep;}
        function setLogradouro() {$this->logradouro = $logradouro;}
        function setBairro() {$this->bairro = $bairro;}
        function setIdCidade() {$this->idCidade = $idCidade;}
        function setIdCategoriaEndereco() {$this->idCategoriaEndereco = $idCategoriaEndereco;}
        function setObservacao() {$this->observacao = $observacao;}

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