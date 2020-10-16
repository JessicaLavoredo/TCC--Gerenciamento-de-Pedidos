<?php
    class Cidade {
        private $idCidade;
        private $nome;
        private $estado;
        private $estadoSigla;
        private $pais;

        function getIdCidade() {return $this->idCidade;}
        function getNome() {return $this->nome;}
        function getEstado() {return $this->estado;}
        function getEstadoSigla() {return $this->estadoSigla;}
        function getPais() {return $this->pais;}

        function setIdCidade() {$this->idCidade = $idCidade;}
        function setNome() {$this->nome = $nome;}
        function setEstado() {$this->estado = $estado;}
        function setEstadoSigla() {$this->estadoSigla = $estadoSigla;}
        function setPais() {$this->pais = $pais;}

        function __construct($idCidade="", $nome="", $estado="", $estadoSigla="", $pais="") {
            $this->setIdCidade($idCidade);
            $this->setNome($nome);
            $this->setEstado($estado);
            $this->setEstadoSigla($estadoSigla);
            $this->setPais($pais);
        }
    }
?>