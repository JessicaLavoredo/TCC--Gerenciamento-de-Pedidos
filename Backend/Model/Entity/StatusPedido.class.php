<?php
    class StatusPedido{
        private $idStatusPedido;
        private $nome;
        private $descricao;
        
        function getIdStatusPedido() {return $this->idStatusPedido;}
        function getNome() {return $this->nome;}
        function getDescricao() {return $this->descricao;}

        function setIdStatusPedido($idStatusPedido) {$this->idStatusPedido = $idStatusPedido;}
        function setNome($nome) {$this->nome = $nome;}
        function setDescricao($descricao) {$this->descricao = $descricao;}

        function __construct($idStatusPedido="", $nome="", $descricao="") {
            $this->setIdStatusPedido($idStatusPedido);
            $this->setNome($nome);
            $this->setDescricao($descricao);
        }
    }
?>