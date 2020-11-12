<?php
    class Perfil {
        private $idPerfil;
        private $nome;
        
        function getIdPerfil() {return $this->idPerfil;}
        function getNome() {return $this->nome;}

        function setIdPerfil($idPerfil) {$this->idPerfil = $idPerfil;}
        function setNome($nome) {$this->nome = $nome;}

        function __construct($idPerfil="", $nome="") {
            $this->setIdPerfil($idPerfil);
            $this->setNome($nome);
        }
    }
?>