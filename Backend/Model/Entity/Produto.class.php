<?php
    class Produto{
        private $idProduto;
        private $nomeTecnico;
        private $nomeComercial;
        private $codigoInterno;
        private $descricao;
        
        function getIdProduto() {return $this->idProduto;}
        function getNomeTecnico() {return $this->nomeTecnico;}
        function getNomeComercial() {return $this->nomeComercial;}
        function getCodigoInterno() {return $this->codigoInterno;}
        function getDescricao() {return $this->descricao;}

        function setIdProduto() {$this->idProduto = $idProduto;}
        function setNomeTecnico() {$this->nomeTecnico = $nomeTecnico;}
        function setNomeComercial() {$this->nomeComercial = $nomeComercial;}
        function setCodigoInterno() {$this->codigoInterno = $codigoInterno;}
        function setDescricao() {$this->descricao = $descricao;}

        function __construct($idProduto="", $nomeTecnico="", $nomeComercial="", $codigoInterno="", $descricao="") {
            $this->setIdProduto($idProduto);
            $this->setNomeTecnico($nomeTecnico);
            $this->setNomeComercial($nomeComercial);
            $this->setCodigoInterno($codigoInterno);
            $this->setDescricao($descricao);
        }
    }
?>