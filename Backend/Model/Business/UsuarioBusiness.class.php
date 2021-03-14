<?php

    class UsuarioBusiness extends BaseBusiness {

        function getUsuarioPorId($idUsuario) {
            return (new usuarioData())->getUsuarioPorID($idUsuario);
        }

        function getUsuariosPorPerfil($idPerfil) {
            return (new usuarioData())->getUsuariosPorPerfil($idPerfil);
        }

        function login($login, $senha) {
            $usuario = New Usuario("","",$login,$senha,"");
            return (new UsuarioData())->autenticarUsuario($usuario);
        }
    } // fim da classe
?>