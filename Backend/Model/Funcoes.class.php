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
                        return "'".join(",",$dado)."'";
                    break;

                    case "object":
                    default:
                    throw New Exception("Invalid data type.");
                }
            } catch (Exception $e) {
                die ($e->getMessage());
            }
        }
    }
?>