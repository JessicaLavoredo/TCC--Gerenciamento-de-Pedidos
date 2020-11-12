<?php
    class CategoriaTelefone {
        private $idCategoriaTelefone;
        private $nome;
        private $descricao;
        
        function getIdCategoriaTelefone() {return $this->idCategoriaTelefone;}
        function getNome() {return $this->nome;}
        function getDescricao() {return $this->descricao;}

        function setIdCategoriaTelefone($idCategoriaTelefone) {$this->idCategoriaTelefone = $idCategoriaTelefone;}
        function setNome($nome) {$this->nome = $nome;}
        function setDescricao($descricao) {$this->descricao = $descricao;}

        function __construct($idCategoriaTelefone="", $nome="", $descricao="") {
            $this->setIdCategoriaTelefone($idCategoriaTelefone);
            $this->setNome($nome);
            $this->setDescricao($descricao);
        }
    }
?>