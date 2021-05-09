<?php
    class Endereco extends BaseEntity {
        private ?int $idEndereco;
        private ?int $idPessoa;
        private ?string $cep;
        private ?string $logradouro;
        private ?string $numero;
        private ?string $bairro;
        private ?int $idCidade;
        private ?int $idCategoriaEndereco;
        private ?string $observacao;
        
        function getIdEndereco():?int {return $this->idEndereco;}
        function getIdPessoa():?int {return $this->idPessoa;}
        function getCep():?string {return $this->cep;}
        function getLogradouro():?string {return $this->logradouro;}
        function getNumero():?string {return $this->numero;}
        function getBairro():?string {return $this->bairro;}
        function getIdCidade():?string {return $this->idCidade;}
        function getIdCategoriaEndereco():?int {return $this->idCategoriaEndereco;}
        function getObservacao():?string {return $this->observacao;}

        function setIdEndereco(?int $idEndereco) {$this->idEndereco = $idEndereco;}
        function setIdPessoa(?int $idPessoa) {$this->idPessoa = $idPessoa;}
        function setCep(?string $cep) {$this->cep = $cep;}
        function setLogradouro(?string $logradouro) {$this->logradouro = $logradouro;}
        function setNumero(?string $numero) {$this->numero = $numero;}
        function setBairro(?string $bairro) {$this->bairro = $bairro;}
        function setIdCidade(?int $idCidade) {$this->idCidade = $idCidade;}
        function setIdCategoriaEndereco(?int $idCategoriaEndereco) {$this->idCategoriaEndereco = $idCategoriaEndereco;}
        function setObservacao(?string $observacao) {$this->observacao = $observacao;}

        function __construct($idEndereco=null, $idPessoa=null, $cep=null, $logradouro=null, $numero=null, $bairro=null, $idCidade=null, $idCategoriaEndereco=null, $observacao=null) {
            $this->setIdEndereco($idEndereco);
            $this->setIdPessoa($idPessoa);
            $this->setCEP($cep);
            $this->setLogradouro($logradouro);
            $this->setNumero($numero);
            $this->setBairro($bairro);
            $this->setIdCidade($idCidade);
            $this->setIdCategoriaEndereco($idCategoriaEndereco);
            $this->setObservacao($observacao);
        }
            
    }
?>