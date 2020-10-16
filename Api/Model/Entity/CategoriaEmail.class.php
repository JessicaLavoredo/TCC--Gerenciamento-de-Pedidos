<?php
    class CategoriaEmail extends CategoriaEmailData {
        private $idCategoriaEmail;
        private $nome;
        private $descricao;
        
        function getIdCategoriaEmail() {return $this->idCategoriaEmail;}
        function getNome() {return $this->nome;}
        function getDescricao() {return $this->descricao;}

        function setIdCategoriaEmail($idCategoriaEmail) {$this->idCategoriaEmail = $idCategoriaEmail;}
        function setNome($nome) {$this->nome = $nome;}
        function setDescricao($descricao) {$this->descricao = $descricao;}

        function __construct($idCategoriaEmail="", $nome="", $descricao="") {
            $this->setIdCategoriaEmail($idCategoriaEmail);
            $this->setNome($nome);
            $this->setDescricao($descricao);
        }
    }
?>