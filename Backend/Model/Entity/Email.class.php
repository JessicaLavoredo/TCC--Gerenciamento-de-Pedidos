<?php
    class Email extends BaseEntity {
        private ?int $idEmail;
        private ?int $idPessoa;
        private ?string $endereco;
        private ?int $idCategoriaEmail;
        private ?string $observacao;

        function getIdEmail() {return $this->idEmail;}
        function getIdPessoa() {return $this->idPessoa;}
        function getEndereco() {return $this->endereco;}
        function getIdCategoriaEmail() {return $this->idCategoriaEmail;}
        function getObservacao() {return $this->observacao;}

        function setIdEmail($idEmail) {$this->idEmail = $idEmail;}
        function setIdPessoa($idPessoa) {$this->idPessoa = $idPessoa;}
        function setEndereco($endereco) {$this->endereco = $endereco;}
        function setIdCategoriaEmail($idCategoriaEmail) {$this->idCategoriaEmail = $idCategoriaEmail;}
        function setObservacao($observacao) {$this->observacao = $observacao;}

        function __construct($idEmail=null, $idPessoa=null, $endereco=null, $idCategoriaEmail=null, $observacao=null) {
            $this->setIdEmail($idEmail);
            $this->setIdPessoa($idPessoa);
            $this->setEndereco($endereco);
            $this->setIdCategoriaEmail($idCategoriaEmail);
            $this->setObservacao($observacao);
        }
    }
?>