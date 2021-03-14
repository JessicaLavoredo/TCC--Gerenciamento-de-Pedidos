<?php
    class VinculoPessoaData extends BaseData{
        function __construct() {
            parent::__construct();
        }

        function deletarTodosPorIdPessoa(int $idPessoa) {
            try {
                $classe = str_ireplace('Data', '', get_class($this));
                $sql = "DELETE FROM ".$classe."\n";
                $sql.= "WHERE IdPessoa = ?";
                $stm = $this->db->prepare($sql);
                $stm->bindValue(1,$idPessoa);
                $stm->execute();
                return "Registros excluídos com sucesso!";
            } catch(Exception $e) {
                return "Erro: ".$e->getMessage();
            }
        }
    }
?>