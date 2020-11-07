<?php

    class BaseBusiness {

        function __construct() {

        }

        function buscarTodos() {
            $classeData = str_ireplace('Business', 'Data', get_class($this));
            return (New $classeData())->buscarTodos();
        }

        function buscarTodosAtivos() {
            $classeData = str_ireplace('Business', 'Data', get_class($this));
            return (New $classeData())->buscarTodosAtivos();
        }

        function buscarPorId($id){
            $classeData = str_ireplace('Business', 'Data', get_class($this));
            return (New $classeData())->buscarPorId($id);
        }

        function gravar($entidade = null) {
            $classeData = str_ireplace('Business', 'Data', get_class($this));
            return (New $classeData())->gravar($entidade);
        }
    }

?>