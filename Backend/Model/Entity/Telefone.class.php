<?php
    class Telefone {
        private $idTelefone;
        private $idPessoa;
        private $dDI;
        private $dDD;
        private $numero;
        private $ramal;
        private $idCategoriaTelefone;
        private $observacao;
        
        function getIdTelefone() {return $this->idTelefone;}
        function getIdPessoa() {return $this->idPessoa;}
        function getDDI() {return $this->dDI;}
        function getDDD() {return $this->dDD;}
        function getNumero() {return $this->numero;}
        function getRamal() {return $this->ramal;}
        function getIdCategoriaTelefone() {return $this->idCategoriaTelefone;}
        function getObservacao() {return $this->observacao;}

        function setIdTelefone($idTelefone) {$this->idTelefone = $idTelefone;}
        function setIdPessoa($idPessoa) {$this->idPessoa = $idPessoa;}
        function setDDI($dDI) {$this->dDI = $dDI;}
        function setDDD($dDD) {$this->dDD = $dDD;}
        function setNumero($numero) {$this->numero = $numero;}
        function setRamal($ramal) {$this->ramal = $ramal;}
        function setIdCategoriaTelefone($idCategoriaTelefone) {$this->idCategoriaTelefone = $idCategoriaTelefone;}
        function setObservacao($observacao) {$this->observacao = $observacao;}

        function __construct($idTelefone="", $idPessoa="", $dDI="", $dDD="", $numero="", $ramal="", $idCategoriaTelefone="", $observacao="") {
            $this->setIdTelefone($idTelefone);
            $this->setIdPessoa($idPessoa);
            $this->setDDI($dDI);
            $this->setDDD($dDD);
            $this->setNumero($numero);
            $this->setRamal($ramal);
            $this->setIdCategoriaTelefone($idCategoriaTelefone);
            $this->setObservacao($observacao);
        }
    }
?>