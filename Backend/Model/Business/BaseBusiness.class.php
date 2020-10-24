<?php

    class BaseBusiness {

        function __construct() {

        }

        function buscarTodos() {
            $classe = str_ireplace('Business', '', get_class($this));
            return (New $classe())->buscarTodos();
        }

        function gravar($obj) {
            $classe = str_ireplace('Business', '', get_class($this));
            $propriedades = array_filter(get_class_methods($classe), function($x){if (strpos($x,'set') === 0){ return true;}});
            $propriedades = array_map(function($x){return substr_replace($x,'',0,3);}, $propriedades);

            $entidade = New $classe();
            foreach($propriedades as $prop){
                $set = 'set'.$prop;
                if ($obj[$prop]){
                    $entidade->$set($obj[$prop]);
                }
            }

            return $entidade->gravar();
        }
    }

?>