<?php
    class FormaPagamento{

        private $idFormaPagamento;
        private $descritivo;
        
        function getIdFormaPagamento() {return $this->idFormaPagamento;}
        function getDescritivo() {return $this->descritivo;}

        function setIdFormaPagamento() {$this->idFormaPagamento = $idFormaPagamento;}
        function setDescritivo() {$this->descritivo = $descritivo;}

        function __construct($idFormaPagamento="", $descritivo="") {
            $this->setIdFormaPagamento($idFormaPagamento);
            $this->setDescritivo($descritivo);
        }            
    }
?>