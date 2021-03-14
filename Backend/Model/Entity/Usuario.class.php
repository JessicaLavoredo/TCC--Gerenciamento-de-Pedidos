<?php
    class Usuario extends BaseEntity {
        private $idUsuario;
        private $idPessoa;
        private $login;
        private $senha;
        private $idPerfil;
        
        function getIdUsuario() {return $this->idUsuario;}
        function getIdPessoa() {return $this->idPessoa;}
        function getLogin() {return $this->login;}
        function getSenha() {return $this->senha;}
        function getIdPerfil() {return $this->idPerfil;}

        function setIdUsuario($idUsuario) {$this->idUsuario = $idUsuario;}
        function setIdPessoa($idPessoa) {$this->idPessoa = $idPessoa;}
        function setLogin($login) {$this->login = $login;}
        function setSenha($senha) {$this->senha = $senha;}
        function setIdPerfil($idPerfil) {$this->idPerfil = $idPerfil;}

        function __construct($idUsuario=null, $idPessoa=null, $login=null, $senha=null, $idPerfil=null) {
            $this->setIdUsuario($idUsuario);
            $this->setIdPessoa($idPessoa);
            $this->setLogin($login);
            $this->setSenha($senha);
            $this->setIdPerfil($idPerfil);
        }        
    } // final da classe
?>