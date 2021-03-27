<?php
    class CidadeData extends BaseData {
        function __construct() {
            parent::__construct();
        }

        function buscarTodos() {
            $ret = [];
            
            $sql = "SELECT * FROM cidade c \n";
            $sql.= "INNER JOIN estado e ON e.idEstado = c.idEstado \n";
            $sql.= "ORDER BY c.Nome ASC";
            $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_NUM);
            $stm = $this->db->prepare($sql);
            $stm->execute();
            $linhas = $stm->fetchAll();

            foreach ($linhas as $linha) {
                $estado = new Estado($linha[4], $linha[5], $linha[6], $linha[7], $linha[8]);
                $cidade = new Cidade($linha[0], $linha[1], $linha[2], $estado);
                $ret[] = $cidade;
            }

            return $ret;
        }
    }
?>