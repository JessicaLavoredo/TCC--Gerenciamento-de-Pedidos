<?php
    class CategoriaTelefone extends BaseEntity {
        private $idCategoriaTelefone;
        private $nome;
        private $descricao;
        
        function getIdCategoriaTelefone() {return $this->idCategoriaTelefone;}
        function getNome() {return $this->nome;}
        function getDescricao() {return $this->descricao;}

        function setIdCategoriaTelefone($idCategoriaTelefone) {$this->idCategoriaTelefone = $idCategoriaTelefone;}
        function setNome($nome) {$this->nome = $nome;}
        function setDescricao($descricao) {$this->descricao = $descricao;}

        function __construct($idCategoriaTelefone=null, $nome=null, $descricao=null) {
            $this->setIdCategoriaTelefone($idCategoriaTelefone);
            $this->setNome($nome);
            $this->setDescricao($descricao);
        }
    }
?>