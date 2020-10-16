<?php
    abstract class Entidade {

        function __construct() {
            
        }

        function hidratar(array $dados) {
            foreach($dados as $chave => $valor){
                $metodo = 'set'.ucfirst($chave);
                if(method_exists($this, $metodo)) {
                    $this->$metodo($valor);
                }
            }
        }
    }