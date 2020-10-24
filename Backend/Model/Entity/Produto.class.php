<?php
    class Produto extends ProdutoData {
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

        function setIdProduto($idProduto) {$this->idProduto = $idProduto;}
        function setNomeTecnico($nomeTecnico) {$this->nomeTecnico = $nomeTecnico;}
        function setNomeComercial($nomeComercial) {$this->nomeComercial = $nomeComercial;}
        function setCodigoInterno($codigoInterno) {$this->codigoInterno = $codigoInterno;}
        function setDescricao($descricao) {$this->descricao = $descricao;}

        function __construct($idProduto="", $nomeTecnico="", $nomeComercial="", $codigoInterno="", $descricao="") {
            parent::__construct();
            $this->setIdProduto($idProduto);
            $this->setNomeTecnico($nomeTecnico);
            $this->setNomeComercial($nomeComercial);
            $this->setCodigoInterno($codigoInterno);
            $this->setDescricao($descricao);
        }
    }
?>