<?php
    class PessoaData extends BaseData{
        function __construct() {
            parent::__construct();
        }

        function gravar($entidade) {;
            $classe = get_class($entidade);
            $propriedades = (New Funcoes())->getPropriedades($entidade);
            
            $sql = "INSERT INTO ".$classe." (".join(", ", $propriedades).")\n";

            $chaves = array_map(function($x){return strtoupper($x);});
            


            // $valoresSql = [];
            // foreach($propriedades as $prop){
            //     $get = "get".$prop;
            //     $valoresSql[$prop] = (New Funcoes())->preparaDadoSql($entidade->$get());
            // }
            // $sql = "INSERT INTO ".get_class($entidade)." (".join(", ", $propriedades).")\n";
            // $sql.= "VALUES (".join(", ", $valoresSql).")";
        }
    } // fim da classe
?>