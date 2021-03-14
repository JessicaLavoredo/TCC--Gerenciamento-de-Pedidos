<?php
    class Produto extends BaseEntity {
        private $idProduto;
        private $nomeTecnico;
        private $nomeComercial;
        private $codigoInterno;
        private $descricao;
        private $vista;
        private $prazo;
        
        function getIdProduto() {return $this->idProduto;}
        function getNomeTecnico() {return $this->nomeTecnico;}
        function getNomeComercial() {return $this->nomeComercial;}
        function getCodigoInterno() {return $this->codigoInterno;}
        function getDescricao() {return $this->descricao;}
        function getVista() {return $this->vista;}
        function getPrazo() {return $this->prazo;}

        function setIdProduto($idProduto) {$this->idProduto = $idProduto;}
        function setNomeTecnico($nomeTecnico) {$this->nomeTecnico = $nomeTecnico;}
        function setNomeComercial($nomeComercial) {$this->nomeComercial = $nomeComercial;}
        function setCodigoInterno($codigoInterno) {$this->codigoInterno = $codigoInterno;}
        function setDescricao($descricao) {$this->descricao = $descricao;}
        function setVista($vista) {$this->vista = $vista;}
        function setPrazo($prazo) {$this->prazo = $prazo;}

        function __construct($idProduto=null, $nomeTecnico=null, $nomeComercial=null, $codigoInterno=null, $descricao=null, $vista=0, $prazo=0) {
            $this->setIdProduto($idProduto);
            $this->setNomeTecnico($nomeTecnico);
            $this->setNomeComercial($nomeComercial);
            $this->setCodigoInterno($codigoInterno);
            $this->setDescricao($descricao);
            $this->setVista($vista);
            $this->setPrazo($prazo);
        }
    }
?>