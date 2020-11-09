<?php

    class BaseData extends Conexao{

        function __construct() {
            parent::__construct();
        }

        function gravar($entidade) {
            $sql = '';
            $classe = get_class($entidade);
            $propriedades = (New Funcoes())->getPropriedades($classe);
            $getId = "getId".$classe;

            // CASO O OBJETO A SER GRAVADO TENHA UM ID O REGISTRO SERÁ ALTERADO.
            if ($entidade->$getId()) {
                $sql = "UPDATE ".$classe."\n";
                $sql .= "SET ";
                foreach ($propriedades as $prop){
                    $get = "get".$prop;
                    $sql .= $prop." = ".(New Funcoes())->preparaDadoSql($entidade->$get()).", ";
                }
                $sql = substr_replace($sql,"\n",-2);
                $sql .= "WHERE Id".$classe." = ".$entidade->$getId();
            } else {
                // CASO O OBJETO NÃO TENHA UM ID SERÁ INSERIDO UM NOVO REGISTRO.
                $sql = "INSERT INTO ".$classe." (".join(", ", $propriedades).")\n";
                $sql .= "VALUES (";
                foreach ($propriedades as $prop){
                    $get = "get".$prop;
                    $sql .= (New Funcoes())->preparaDadoSql($entidade->$get()).", ";
                }
                $sql = substr_replace($sql,")\n",-2);
            }

            // $ret = $this->executar($sql, $classe);
            try {
                $stm = $this->db->prepare($sql);
                $stm->execute();
                $this->db = null;
                return "Registro gravado com sucesso.";
            } catch (Exception $e) {
                return "Erro ao gravar no Banco.";
            }
        }

        function buscarTodos() {
            $classe = str_ireplace('Data', '', get_class($this));
            $sql = "SELECT * FROM ".$classe;
            $ret = $this->executar($sql, $classe);
            return $ret;
        }

        function buscarTodosAtivos() {
            $classe = str_ireplace('Data', '', get_class($this));
            $propriedades = array_filter(get_class_methods($classe), function($x){if (strpos($x,'set') === 0){ return true;}});
            if (count(array_filter($propriedades, function($x){if (stristr($x,'Inativo') !== false){return true;}})) > 0) { 
                $sql = "SELECT * FROM ".$classe." WHERE Inativo = 0";
                $ret = $this->executar($sql, $classe);
            } else {
                $ret = $this->buscarTodos();
            }
            return $ret;
        }

        function buscarPorId($id){
            $classe = str_ireplace('Data', '', get_class($this));
            $sql = "SELECT * FROM ".$classe." WHERE Id".$classe." = ".$id;
            $ret = $this->executar($sql, $classe);
            return $ret;
        }

    }

?>