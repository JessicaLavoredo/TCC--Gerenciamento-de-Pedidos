<?php
    class Cidade extends CidadeData {
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

        function setIdCidade($idCidade) {$this->idCidade = $idCidade;}
        function setNome($nome) {$this->nome = $nome;}
        function setEstado($estado) {$this->estado = $estado;}
        function setEstadoSigla($estadoSigla) {$this->estadoSigla = $estadoSigla;}
        function setPais($pais) {$this->pais = $pais;}

        function __construct($idCidade="", $nome="", $estado="", $estadoSigla="", $pais="") {
            $this->setIdCidade($idCidade);
            $this->setNome($nome);
            $this->setEstado($estado);
            $this->setEstadoSigla($estadoSigla);
            $this->setPais($pais);
        }
    }
?>