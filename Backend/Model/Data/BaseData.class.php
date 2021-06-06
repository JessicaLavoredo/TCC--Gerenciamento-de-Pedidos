<?php

    abstract class BaseData extends Conexao{

        function __construct() {
            parent::__construct();
        }

        private function validaEntidade($entidade) {
            try {
                $classe = str_ireplace('Data', '', get_class($this));
                if (!is_object($entidade) || !gettype($entidade) == $classe) {
                    throw new Exception("Erro: Objeto inválido");
                }
                return true;
            } catch (Exception $e) {
                return "Erro: ".$e->getMessage();
            }
        }

        private function inserir($entidade) {
            try {
                $classe = str_ireplace('Data', '', get_class($this));
                $propriedades = Funcoes::getPropriedades($classe);

                $sql = "INSERT INTO ".$classe." (".join(", ", $propriedades).")\n";
                $sql.= "VALUES (".join(', ', array_map(function($x){return ":".$x;}, $propriedades)).")";

                $stm = $this->db->prepare($sql);
                foreach($propriedades as $prop) {
                    $get = "get".ucfirst($prop);
                    $stm->bindValue(":".$prop, $entidade->$get());
                }
                $stm->execute();
                return "Registro gravado com sucesso!";
            } catch (Exception $e) {
                return "Erro: ".$e->getMessage();
            }
        }

        private function atualizar($entidade) {
            try{
                $classe = get_class($entidade);
                $propriedades = Funcoes::getPropriedades($classe);
                $indicePropId = array_search(strtoupper('id'.$classe), array_map(function($x){return strtoupper($x);}, $propriedades));
                $getId = "get".ucfirst($propriedades[$indicePropId]);
                $propriedades = Funcoes::array_remove(array_map(function($x){return strtoupper($x);}, $propriedades), strtoupper('id'.$classe));

                $sql = "UPDATE ".$classe."\n";
                $sql.= "SET ";
                foreach($propriedades as $prop){
                    $sql.= $prop." = :".$prop.", ";
                }
                $sql = substr_replace($sql,"\n",-2);
                $sql.= "WHERE Id".$classe." = :Id".$classe;
                
                $stm = $this->db->prepare($sql);
                foreach($propriedades as $prop){
                    $get = "get".ucfirst($prop);
                    $stm->bindValue(":".$prop, $entidade->$get());
                }
                $stm->bindValue(":Id".$classe, $entidade->$getId());
                $stm->execute();
                return "Registro gravado com sucesso!";
            } catch(Exception $e) {
                return "Erro: ".$e->getMessage();
            }
        }

        function gravar($entidade) {
            try {
                $this->validaEntidade($entidade);
                
                $classe = str_ireplace('Data', '', get_class($this));
                $getId = 'getId'.$classe;
                $id = (int)$entidade->$getId();

                if (isset($id) && $id > 0) {
                    return $this->atualizar($entidade);
                } else {
                    $setId = 'setId'.$classe;
                    $entidade->$setId(null);
                    return $this->inserir($entidade);
                }
            } catch (Exception $e) {
                return "Erro: ".$e->getMessage();
            }
        }

        function deletar($entidade) {
            $classe = str_ireplace('Data', '', get_class($this));
            $getId = 'getId'.$classe;
            $id = (int)$entidade->$getId();

            try {
                if (isset($id) && $id > 0) {
                    $sql = 'DELETE FROM '.$classe."\n";
                    $sql.= 'WHERE Id'.$classe.' = :Id'.$classe;
                    $stm = $this->db->prepare($sql);
                    $stm->bindValue(':Id'.$classe, $entidade->$getId());
                    $stm->execute();
                    return 'Registro excluído com sucesso.';
                }
            } catch (Exception $e) {
                return 'Erro: '.$e->getMessage();
            }
        }

        function buscarPorId(int $id){
            $classe = str_ireplace('Data', '', get_class($this));
            $sql = "SELECT * FROM ".$classe." WHERE Id".$classe." = ".$id;
            $stm = $this->db->prepare($sql);
            $stm->execute();
            $ret = $stm->fetch();
            if ($ret === false) {
                return;
            }
            return Funcoes::criarEntidade($classe, $ret);
        }

        function buscarPorFiltro($entidade){
            $classe = str_ireplace('Data', '', get_class($entidade));
            $propriedades = Funcoes::getPropriedades($classe);

            $sql = "SELECT * FROM ".$classe."\n";
            $sql.= "WHERE ";

            $parametros = array();
            foreach($propriedades as $prop) {
                $getProp = 'get'.ucfirst($prop);
                if($entidade->$getProp()) {
                    $parametros[] = $prop." LIKE '%".$entidade->$getProp()."%'";
                } else {
                    unset($propriedades[array_search($prop, $propriedades)]);
                }
            }
            $sql.= implode(" AND ", $parametros);

            $stm = $this->db->prepare($sql);
            $stm->execute();
            $linhas = $stm->fetchAll();
            $ret = array();
            foreach($linhas as $linha){
                $ret[] = Funcoes::criarEntidade($classe, $linha);
            }
            return $ret;
        }

        function buscarTodos() {
            $classe = str_ireplace('Data', '', get_class($this));
            $sql = "SELECT * FROM ".$classe;
            $stm = $this->db->prepare($sql);
            $stm->execute();
            $linhas = $stm->fetchAll();
            $ret = array();
            foreach($linhas as $linha){
                $ret[] = Funcoes::criarEntidade($classe, $linha);
            }
            return $ret;
        }

        function buscarTodosAtivos() {
            $classe = str_ireplace('Data', '', get_class($this));
            $propriedades = Funcoes::getPropriedades($classe);

            if (count(array_filter($propriedades, function($x){if (stristr($x,'Inativo') !== false){return true;}})) > 0) { 
                $sql = "SELECT * FROM ".$classe." WHERE Inativo = 0";
                $stm = $this->db->prepare($sql);
                $stm->execute();
                $ret = $stm->fetchAll();
            } else {
                $ret = $this->buscarTodos();
            }
            return $ret;
        }

    }

?>