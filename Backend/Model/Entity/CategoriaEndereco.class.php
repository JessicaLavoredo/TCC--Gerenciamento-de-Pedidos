<?php
    class CategoriaEndereco {
        private $idCategoriaEndereco;
        private $nome;
        private $descricao;
        
        function getIdCategoriaEndereco() {return $this->idCategoriaEndereco;}
        function getNome() {return $this->nome;}
        function getDescricao() {return $this->descricao;}

        function setIdCategoriaEndereco($idCategoriaEndereco) {$this->idCategoriaEndereco = $idCategoriaEndereco;}
        function setNome($nome) {$this->nome = $nome;}
        function setDescricao($descricao) {$this->descricao = $descricao;}

        function __construct($idCategoriaEndereco="", $nome="", $descricao="") {
            $this->setIdCategoriaEndereco($idCategoriaEndereco);
            $this->setNome($nome);
            $this->setDescricao($descricao);
        }
    }
?>