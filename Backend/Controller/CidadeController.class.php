<?php
    class CidadeController extends BaseController {

        function buscarTodosManual() {
            $ret = (new CidadeData())->buscarTodosManual();
            return $ret;
        }
    }
?>