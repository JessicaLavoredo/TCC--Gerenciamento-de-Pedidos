<?php

    class UsuarioData extends BaseData {

        function __construct() {
            parent:: __construct();
        }

        function autenticarUsuario($usuario){
            $sql = "SELECT * \n";
            $sql.= "FROM usuario\n";
            $sql.= "WHERE login = ? ";
            $sql.= "AND senha = ? ";

            try {
                $stm = $this->db->prepare($sql);
                $stm->bindValue(1, $usuario->getLogin());
                $stm->bindValue(2, $usuario->getSenha());
                $stm->execute();
                $this->db = null;
                $resultado = $stm->fetchAll();
                $ret = Funcoes::criarEntidade('Usuario', $resultado[0]);
                return $ret;
            } catch (Exception $e) {
                return "Erro: ".$e->getMessage();
            }
        }

        function getUsuariosPorPerfil($idPerfil) {
            $sql += "SELECT *";
            $sql += "FROM usuario U";
            $sql += "INNER JOIN perfil_usuario PU ON PU.idUsuario = U.idUsuario";
            $sql += "WHERE PU.idPerfil = ?";

            try {
                $stm = $this->db->prepare($sql);
                $stm->bindValue(1, $idPerfil);
                $stm->execute();
                $this->db = null;
                $resultado = $stm->fetchAll(PDO::FETCH_OBJ);
                return $resultado;
            } catch (Exception $e) {
                die ($e->getMessage());
            }
        }
        

    } // final da classe 
?>