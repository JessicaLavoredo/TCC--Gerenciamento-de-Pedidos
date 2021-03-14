<?php
    class FormaPagamento extends BaseEntity {

        private $idFormaPagamento;
        private $descritivo;
        
        function getIdFormaPagamento() {return $this->idFormaPagamento;}
        function getDescritivo() {return $this->descritivo;}

        function setIdFormaPagamento($idFormaPagamento) {$this->idFormaPagamento = $idFormaPagamento;}
        function setDescritivo($descritivo) {$this->descritivo = $descritivo;}

        function __construct($idFormaPagamento=null, $descritivo=null) {
            $this->setIdFormaPagamento($idFormaPagamento);
            $this->setDescritivo($descritivo);
        }            
    }
?>