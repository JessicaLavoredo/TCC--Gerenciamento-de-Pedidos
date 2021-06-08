<?php
    class CidadeController extends BaseController {

        function buscarTodos() {
            $cidades = (new CidadeData())->buscarTodos();
            $this->preencherEstado($cidades);
            return $cidades;
        }

        function buscarPorFiltro($obj) {
            $entidade = Funcoes::criarEntidade("Cidade", $obj);
            $cidades = (new CidadeData())->buscarPorFiltro($entidade);
            $this->preencherEstado($cidades);
            return $cidades;
        }

        private function preencherEstado(&$cidades) {
            $estados = array_map(function($x){return Funcoes::objetoParaArray($x);}, (new EstadoData())->buscarTodos());

            array_walk($cidades, function(&$cidade, $chave, $estados){
                $cidade = Funcoes::objetoParaArray($cidade);
                $estadoChave = array_search($cidade["IdEstado"], array_column($estados, "IdEstado"));
                $cidade["Estado"] = $estados[$estadoChave];
                unset($cidade["IdEstado"]);
            }, $estados);
        }

        function buscarPorId($id) {
            $cidade = (new CidadeData())->buscarPorId($id);
            $estado = (new EstadoData())->buscarPorId($cidade->getIdEstado());
            $ret = Funcoes::objetoParaArray($cidade);
            $ret["Estado"] = $estado;
            unset($ret["IdEstado"]);
            return $ret;
        }
    }
?>