<?php
    abstract class Funcoes {

        static function array_remove(array $array, $valor){
            $indiceRem = array_search($valor, $array);
            unset($array[$indiceRem]);
            return array_values($array);
        }

        static function getPropriedades($classe) {
            $propriedades = array_filter(get_class_methods($classe), function($x){if (strpos($x,'set') === 0){ return true;}});
            $propriedades = array_map(function($x){return lcfirst(substr_replace($x,'',0,3));}, $propriedades);
            return $propriedades;
        }

        static function criarEntidade(string $classe, $objeto) {
            $retorno = New $classe();
            $propriedades = self::getPropriedades($classe);

            foreach($propriedades as $prop){
                $set = 'set'.ucfirst($prop);
                $chaves = array_keys($objeto);
                $indice = array_search(strtoupper($prop), array_map(function($x){return strtoupper($x);}, $chaves));

                if (gettype($indice) === "integer" && $indice >= 0) {
                    $retorno->$set($objeto[$chaves[$indice]]);
                } else {
                    $retorno->$set(null);
                }
            }

            return $retorno;
        }

    }
?>