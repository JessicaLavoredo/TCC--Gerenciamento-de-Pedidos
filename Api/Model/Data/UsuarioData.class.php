<?php

    require_once "./Model/conexao.class.php";

    class UsuarioData extends BaseData {

        function __construct() {
            parent:: __construct();
        }

        function login($login, $senha) {
            $sql = "SELECT * FROM usuario WHERE login = ? AND senha = ?";

            try {
                $stm = $this->db->prepare($sql);
                $stm->bindValue(1, $login);
                $stm->bindValue(2, $senha);
                $stm->execute();
                $this->db = null;
                $resultado = $stm->fetchAll(PDO::FETCH_OBJ);
                return $resultado;
            } catch (Exception $e) {
                die ($e->getMessage());
            }
        }

        function getUsuarioPorId($idUsuario) {
            $sql = "SELECT * ";
            $sql .= "FROM usuario ";
            $sql .= "WHERE idUsuario = ?";

            try {
                $stm = $this->db->prepare($sql);
                $stm->bindValue(1, $idUsuario);
                $stm->execute();
                $this->db = null;
                $resultado = $stm->fetchAll(PDO::FETCH_OBJ);
                return $resultado;
            } catch (Exception $e) {
                die ($e->getMessage());
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
        
        function autenticarUsuario($usuario){
            $sql += "SELECT idUsuario, idPessoa, idPerfil";
            $sql += "FROM usuario";
            $sql += "WHERE login = ?";
            $sql += "AND senha = ?";

            try {
                $stm = $this->db->prepare($sql);
                $stm->bindValue(1, $usuario->getLogn());
                $stm->bindValue(2, $usuario->getSenha());
                $stm->execute();
                $this->db = null;
                $resultado = $stm->fetchAll(PDO::FETCHOBJ);
                return $resultado;
            } catch (Exception $e) {
                die ($e->getMessage());
            }
        }
    } // final da classe 
?>