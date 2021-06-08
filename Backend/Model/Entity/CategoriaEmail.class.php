<?php
    class CategoriaEmail extends BaseEntity {
        private ?int $idCategoriaEmail;
        private ?string $nome;
        private ?string $descricao;
        
        function getIdCategoriaEmail() {return $this->idCategoriaEmail;}
        function getNome() {return $this->nome;}
        function getDescricao() {return $this->descricao;}

        function setIdCategoriaEmail($idCategoriaEmail) {$this->idCategoriaEmail = $idCategoriaEmail;}
        function setNome($nome) {$this->nome = $nome;}
        function setDescricao($descricao) {$this->descricao = $descricao;}

        function __construct($idCategoriaEmail=null, $nome=null, $descricao=null) {
            $this->setIdCategoriaEmail($idCategoriaEmail);
            $this->setNome($nome);
            $this->setDescricao($descricao);
        }
    }
?>