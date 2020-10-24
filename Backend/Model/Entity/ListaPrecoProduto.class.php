<?php
    class ListaPrecoProduto extends ListaPrecoProdutoData {
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

        function setIdListaPrecoProduto($idListaPrecoProduto) {$this->idListaPrecoProduto = $idListaPrecoProduto;}
        function setIdListaPreco($idListaPreco) {$this->idListaPreco = $idListaPreco;}
        function setIdProduto($idProduto) {$this->idProduto = $idProduto;}
        function setVista($vista) {$this->vista = $vista;}
        function setPrazo($prazo) {$this->prazo = $prazo;}

        function __construct($idListaPrecoProduto="", $idListaPreco="", $idProduto="", $vista="", $prazo="") {
            $this->setIdListaPrecoProduto($idListaPrecoProduto);
            $this->setIdListaPreco($idListaPreco);
            $this->setIdProduto($idProduto);
            $this->setVista($vista);
            $this->setPrazo($prazo);
        }            
    }
?>