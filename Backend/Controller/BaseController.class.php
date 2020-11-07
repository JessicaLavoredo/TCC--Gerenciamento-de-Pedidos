<?php 
    class BaseController {
        
        function buscarTodos(){
            $classe = str_ireplace('Controller', 'Business', get_class($this));
            return (New $classe())->buscarTodos();
        }

        function buscarTodosAtivos() {

        }

        function gravar($obj) {
            $controller = get_class($this);
            $business = str_ireplace('Controller', 'Business', $controller);
            $classeEntidade = str_ireplace('Controller', '', $controller);
            $entidade = (New Funcoes())->criarEntidade($classeEntidade, $obj);
            return (New $business())->gravar($entidade);
        }

        function inativar() {

        }
    }
?>