<?php
    class ListaPrecoProduto{
        private $idListaPrecoProduto;
        private $idListaPreco;
        private $idProduto;
        private $vista;
        private $prazo;
        
        function getIdListaPrecoProduto() {return $this->idListaPrecoProduto;}
        function getIdListaPreco() {return $this->idListaPreco;}
        function getIdProduto() {return $this->idProduto;}
        function getVista() {return $this->vista;}
        function getPrazo() {return $this->prazo;}

        function setIdListaPrecoProduto() {$this->idListaPrecoProduto = $idListaPrecoProduto;}
        function setIdListaPreco() {$this->idListaPreco = $idListaPreco;}
        function setIdProduto() {$this->idProduto = $idProduto;}
        function setVista() {$this->vista = $vista;}
        function setPrazo() {$this->prazo = $prazo;}

        function __construct($idListaPrecoProduto="", $idListaPreco="", $idProduto="", $vista="", $prazo="") {
            $this->setIdListaPrecoProduto($idListaPrecoProduto);
            $this->setIdListaPreco($idListaPreco);
            $this->setIdProduto($idProduto);
            $this->setVista($vista);
            $this->setPrazo($prazo);
        }            
    }
?>