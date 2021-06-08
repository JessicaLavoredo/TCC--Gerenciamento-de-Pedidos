<?php
    class ListaPrecoProduto extends BaseEntity {
        private ?int $idListaPrecoProduto;
        private ?int $idListaPreco;
        private ?int $idProduto;
        private ?float $vista;
        private ?float $prazo;
        
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

        function __construct($idListaPrecoProduto=null, $idListaPreco=null, $idProduto=null, $vista=null, $prazo=null) {
            $this->setIdListaPrecoProduto($idListaPrecoProduto);
            $this->setIdListaPreco($idListaPreco);
            $this->setIdProduto($idProduto);
            $this->setVista($vista);
            $this->setPrazo($prazo);
        }            
    }
?>