<?php
    class CategoriaEndereco extends BaseEntity {
        private ?int $idCategoriaEndereco;
        private ?string $nome;
        private ?string $descricao;
        
        function getIdCategoriaEndereco() {return $this->idCategoriaEndereco;}
        function getNome() {return $this->nome;}
        function getDescricao() {return $this->descricao;}

        function setIdCategoriaEndereco($idCategoriaEndereco) {$this->idCategoriaEndereco = $idCategoriaEndereco;}
        function setNome($nome) {$this->nome = $nome;}
        function setDescricao($descricao) {$this->descricao = $descricao;}

        function __construct($idCategoriaEndereco=null, $nome=null, $descricao=null) {
            $this->setIdCategoriaEndereco($idCategoriaEndereco);
            $this->setNome($nome);
            $this->setDescricao($descricao);
        }
    }
?>