<?php

    class BaseData extends Conexao{

        function __construct() {
            parent::__construct();
        }

        function gravar() {
            $classe = get_class($this);
            $propriedades = array_filter(get_class_methods($classe), function($x){if (strpos($x,'set') === 0){ return true;}});
            $propriedades = array_map(function($x){return substr_replace($x,'',0,3);}, $propriedades);
            $valores = array();
            foreach($propriedades as $prop){
                $get = "get".$prop;
                $valor = $this->$get();
                $valor = (New Funcoes())->preparaDadoSql($valor);
                array_push($valores, $valor);
            }
            $getId = "getId".$classe;

            // CASO O OBJETO A SER GRAVADO TENHA UM ID O REGISTRO SERÁ ALTERADO.
            if ($this->$getId()) {
                $sql = "UPDATE ".$classe."\n";
                $sql.= "SET ";
                for ($i = 0; $i < count($propriedades); $i++){
                    $sql.= $propriedades[$i]." = ".$valores[$i].", ";
                }
                substr_replace($sql,"\n",-0,-2);
                $sql.= "WHERE Id".$classe." = ".$this->$getId();
            } else {
                // CASO O OBJETO NÃO TENHA UM ID SERÁ INSERIDO UM NOVO REGISTRO.
                $sql = "INSERT INTO ".$classe." (".join(", ",$propriedades).")\n";
                $sql.= "VALUES (".join(", ",$valores).")";
            }

            // $ret = $this->executar($sql, $classe);
            $stm = $this->db->prepare($sql);
            $stm->execute();
            $this->db = null;
            return $ret;
        }

        function buscarTodos() {
            $classe = get_class($this);
            $sql = "SELECT * FROM ".$classe;
            $ret = $this->executar($sql, $classe);
            return $ret;
        }

        function buscarPorId(){

        }

    }

?>