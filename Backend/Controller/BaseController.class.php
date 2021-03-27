<?php 
    abstract class BaseController {

        function buscarTodos(){
            $classe = str_ireplace('Controller', 'Data', get_class($this));
            return (New $classe())->buscarTodos();
        }

        function buscarTodosAtivos() {

        }

        function deletar($obj) {
            $controller = get_class($this);
            $data = str_ireplace('Controller', 'Data', $controller);
            $classeEntidade = str_ireplace('Controller', '', $controller);
            $entidade = Funcoes::criarEntidade($classeEntidade, $obj);
            return (New $data())->deletar($entidade);
        }

        function buscarPorFiltro($obj) {
            $controller = get_class($this);
            $data = str_ireplace('Controller', 'Data', $controller);
            $classeEntidade = str_ireplace('Controller', '', $controller);
            $entidade = Funcoes::criarEntidade($classeEntidade, $obj);
            return (New $data())->buscarPorFiltro($entidade);
        }

        function buscarPorId($id){
            $classe = str_ireplace('Controller', 'Data', get_class($this));
            return (New $classe())->buscarPorId($id);
        }

        function gravar($obj) {
            $controller = get_class($this);
            $business = str_ireplace('Controller', 'Data', $controller);
            $classeEntidade = str_ireplace('Controller', '', $controller);
            $entidade = Funcoes::criarEntidade($classeEntidade, $obj);
            return (New $business())->gravar($entidade);
        }

        function inativar() {

        }
    }
?>