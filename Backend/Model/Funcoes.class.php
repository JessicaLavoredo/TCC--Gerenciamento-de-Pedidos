<?php
    class Funcoes {

        function preparaDadoSql($dado){
            try {
                $tipo = gettype($dado);

                switch($tipo) {
                    case "boolean":
                        if ($dado === true) {return 1;} else {return 0;}
                    break;
                    case "integer":
                        return $dado;
                    break;
                    case "double":
                        return $dado;
                    break;
                    case "string":
                        return "'".$dado."'";
                    break;
                    case "array":
                        return "'".join(",",string_replace($dado))."'";
                    break;
                    case "object":
                        return null;
                    case "NULL":
                        return "null";
                    default:
                    throw New Exception("Invalid data type.");
                }
            } catch (Exception $e) {
                die ($e->getMessage());
            }
        }

        function getPropriedades($classe) {
            $propriedades = array_filter(get_class_methods($classe), function($x){if (strpos($x,'set') === 0){ return true;}});
            $propriedades = array_map(function($x){return substr_replace($x,'',0,3);}, $propriedades);
            return $propriedades;
        }

        function criarEntidade($classe, $objeto) {
            $retorno = New $classe();
            $metodosSet = array_filter(get_class_methods($classe), function($x){if (strpos($x,'set') === 0){ return true;}});

            foreach($metodosSet as $set){
                $propriedade = substr_replace($set,'',0,3);
                $chaves = array_keys($objeto);
                $indice = array_search(strtoupper($propriedade), array_map(function($x){return strtoupper($x);}, $chaves));

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