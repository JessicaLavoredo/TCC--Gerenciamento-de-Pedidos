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

        static function primeiroOuPadrao(&$array, $padrao=null){
            return isset($array[0]) ? $array[0] : $padrao;
        }


        static function base64UrlEncode(string $string)
        {
            return str_replace(
                ['+', '/', '='],
                ['-', '_', ''],
                base64_encode($string)
            );
        }

        static function base64UrlDecode(string $string)
        {
            return str_replace(
                ['-', '_', ''],
                ['+', '/', '='],
                base64_decode($string)
            );
        }
        
        static function objetoParaArray($obj){
            return get_object_vars(json_decode(json_encode($obj)));
        }

        //NOVO
        static function criarEntidade(string $classe, $objeto) {
            $entidade = New $classe();            
            if ($objeto === null){
                return $entidade;
            }

            $propriedades = self::getPropriedades($classe);
            $chaves = array_keys($objeto);

            foreach($propriedades as $prop){
                $indice = array_search(strtoupper($prop), array_map(function($x){return strtoupper($x);}, $chaves));
                $chave = $indice !== false ? $chaves[$indice] : $indice;
                $get = 'get'.ucfirst($prop);
                $set = 'set'.ucfirst($prop);

                if (gettype($entidade->$get()) === 'object') {
                    $classeObj = get_class($entidade->$get());
                    if ($chave) {
                        if (isset($objeto[$chave])) {
                            $entidade->$set(self::criarEntidade($classeObj, $objeto[$chave]));
                        }
                    }
                } else {
                    if ($chave){
                        if (isset($objeto[$chave])) {
                            $entidade->$set($objeto[$chave]);
                        }
                    }
                }
            }

            return $entidade;
        }
        

    }
?>