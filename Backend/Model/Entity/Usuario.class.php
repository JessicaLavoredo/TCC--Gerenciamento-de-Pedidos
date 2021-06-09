<?php
    class Usuario extends BaseEntity {
        private ?int $idUsuario;
        private ?int $idPessoa;
        private ?int $idPerfil;
        private ?string $login;
        private ?string $senha;
        private ?bool $inativo;
        
        function getIdUsuario() {return $this->idUsuario;}
        function getIdPessoa() {return $this->idPessoa;}
        function getIdPerfil() {return $this->idPerfil;}
        function getLogin() {return $this->login;}
        function getSenha() {return $this->senha;}
        function getInativo() {return $this->inativo;}

        function setIdUsuario($idUsuario) {$this->idUsuario = $idUsuario;}
        function setIdPessoa($idPessoa) {$this->idPessoa = $idPessoa;}
        function setIdPerfil($idPerfil) {$this->idPerfil = $idPerfil;}
        function setLogin($login) {$this->login = $login;}
        function setSenha($senha) {$this->senha = $senha;}
        function setInativo($inativo) {$this->inativo = $inativo;}

        function __construct($idUsuario=null, $idPessoa=null, $idPerfil=null, $login=null, $senha=null, $inativo=null) {
            $this->setIdUsuario($idUsuario);
            $this->setIdPessoa($idPessoa);
            $this->setIdPerfil($idPerfil);
            $this->setLogin($login);
            $this->setSenha($senha);
            $this->setInativo($inativo);
        }        
    } // final da classe
?>