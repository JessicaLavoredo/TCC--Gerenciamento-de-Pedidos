<?php
    class Perfil{
        private $idPerfil;
        private $nome;
        
        function getIdPerfil() {return $this->idPerfil;}
        function getNome() {return $this->nome;}

        function setIdPerfil() {$this->idPerfil = $idPerfil;}
        function setNome() {$this->nome = $nome;}

        function __construct($idPerfil="", $nome="") {
            $this->setIdPerfil($idPerfil);
            $this->setNome($nome);
        }
    }
?>