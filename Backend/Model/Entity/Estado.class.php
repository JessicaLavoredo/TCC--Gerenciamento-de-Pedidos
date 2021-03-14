<?php

    class Estado extends BaseEntity {
        private $idEstado;
        private $nome;
        private $sigla;
        private $regiao;
        private $codigoIBGE;

        function getIdEstado() {return $this->idEstado;}
        function getNome() {return $this->nome;}
        function getSigla() {return $this->sigla;}
        function getRegiao() {return $this->regiao;}
        function getCodigoIBGE() {return $this->codigoIBGE;}

        function setIdEstado($idEstado) {$this->idEstado = $idEstado;}
        function setNome($nome) {$this->nome = $nome;}
        function setSigla($sigla) {$this->sigla = $sigla;}
        function setRegiao($regiao) {$this->regiao = $regiao;}
        function setCodigoIBGE($codigoIBGE) {$this->codigoIBGE = $codigoIBGE;}
        
        function __construct($idEstado=null, $nome=null, $sigla=null, $regiao=null, $codigoIBGE=null){
            $this->setIdEstado($idEstado);
            $this->setNome($nome);
            $this->setSigla($sigla);
            $this->setRegiao($regiao);
            $this->setCodigoIBGE($codigoIBGE);
        }
    }
?>