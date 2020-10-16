<?php
    require_once "./Model/Data/usuarioData.class.php";

    class UsuarioBusiness {

        function getUsuarioPorId($idUsuario) {
            return (new usuarioData())->getUsuarioPorID($idUsuario);
        }

        function getUsuariosPorPerfil($idPerfil) {
            return (new usuarioData())->getUsuariosPorPerfil($idPerfil);
        }

        function login($login, $senha) {
            // $usuario = New Usuario("","",$login,$senha,"");
            return (new UsuarioData())->login($login, $senha);
        }
    } // fim da classe
?>