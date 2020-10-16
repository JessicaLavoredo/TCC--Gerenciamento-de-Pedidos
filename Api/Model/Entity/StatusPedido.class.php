<?php
    class StatusPedido{
        private $idStatusPedido;
        private $nome;
        private $descricao;
        
        function getIdStatusPedido() {return $this->idStatusPedido;}
        function getNome() {return $this->nome;}
        function getDescricao() {return $this->descricao;}

        function setIdStatusPedido() {$this->idStatusPedido = $idStatusPedido;}
        function setNome() {$this->nome = $nome;}
        function setDescricao() {$this->descricao = $descricao;}

        function __construct($idStatusPedido="", $nome="", $descricao="") {
            $this->setIdStatusPedido($idStatusPedido);
            $this->setNome($nome);
            $this->setDescricao($descricao);
        }
    }
?>