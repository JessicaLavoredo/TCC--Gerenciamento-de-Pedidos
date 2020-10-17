<?php 
    class BaseController {
        
        function buscarTodos(){
            $classe = str_ireplace('Controller', 'Business', get_class($this));
            return (New $classe())->buscarTodos();
        }
    }
?>