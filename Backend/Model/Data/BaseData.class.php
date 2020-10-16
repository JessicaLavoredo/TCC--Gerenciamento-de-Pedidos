<?php

    class BaseData extends Conexao{

        function __construct() {
            parent::__construct();
        }

        function inserir() {
            
            // $classe = get_class($objetos[0]);
            // $metodos = array_filter(get_class_methods($classe), function($x){if (strpos($x,'set') === 0){ return substr_replace($x,'get',0,3);}});

            // var_dump(get_class_vars($classe));

            // $colunas = array_map( function($x){return substr_replace($x,'',0,3);}, $metodos);
            // $dados = array();
            // for($x = 0; $x < count($objetos)-1; $x++){
            //     foreach($metodos as $met) {
            //         array_push($dados[$x], $objetos[$x]->$met());
            //     }
            // }

            // $sql = "INSERT INTO ".$classe." (".join(', ', $colunas).")";
            // $sql .= "\nVALUES\n";
            // foreach($dados as $d) {
            //     $sql .= "(".join(", ", $d)."),\n";
            // }
            // $sql .= substr_replace($sql,'', -1, 1);

            // var_dump($sql);

        }

        function alterar() {

        }

        function buscarTodos() {
            $tabela = get_class($this);
            $sql = "SELECT * FROM ".$tabela;
            $ret = $this->executar($sql);
            return $ret;
        }

        function buscarPorId(){

        }

    }

?>