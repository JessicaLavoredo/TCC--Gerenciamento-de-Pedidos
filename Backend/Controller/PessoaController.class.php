<?php
    class PessoaController extends BaseController {
        
        function buscarPorId($id){
            $pessoa = (New PessoaData())->buscarPorId($id);
            if (!isset($pessoa)){
                return;
            }
            
            $obj = $this->converterParaResponse($pessoa);

            return $obj;
        }

        function buscarPorFiltro($obj) {
            $entidade = Funcoes::objetoParaArray(Funcoes::criarEntidade('Pessoa', $obj));

            if(!isset($obj["Enderecos"])) {
                $obj["Enderecos"] = array();
            }

            $entidade["Enderecos"] = array_map(function($x){
                $endereco = Funcoes::objetoParaArray($x);

                $cidade = $endereco["Cidade"];
                $estado = $cidade["Estado"];
                $cidade = Funcoes::objetoParaArray(Funcoes::criarEntidade('Cidade', $cidade));
                $estado = Funcoes::objetoParaArray(Funcoes::criarEntidade('Estado', $estado));
                $endereco = Funcoes::objetoParaArray(Funcoes::criarEntidade('Endereco', $endereco));
                $cidade["Estado"] = $estado;
                $endereco["Cidade"] = $cidade;
                unset($cidade["IdEstado"]);
                unset($endereco["IdCidade"]);

                return $endereco;
            }, $obj["Enderecos"]);

            if(!isset($obj["Telefones"])){
                $obj["Telefones"] = array();
            }

            $entidade["Telefones"] = array_map(function($x){
                $telefone = Funcoes::objetoParaArray($x);

                $telefone = Funcoes::objetoParaArray(Funcoes::criarEntidade('Telefone', $telefone));

                return $telefone;
            }, $obj["Telefones"]);
            
            if(!isset($obj["Emails"])){
                $obj["Emails"] = array();
            }

            $entidade["Emails"] = array_map(function($x){
                $email = Funcoes::objetoParaArray($x);

                $email = Funcoes::objetoParaArray(Funcoes::criarEntidade("Email", $email));

                return $email;
            }, $obj["Emails"]);
            
            $entidade["Vinculos"] = $obj["Vinculos"] ?? array();

            $pessoas = (New PessoaData())->buscarPorFiltro($entidade);

            $pessoas = array_map(function($x){return $this->converterParaResponse($x);}, $pessoas);

            return $pessoas;
        }

        private function converterParaResponse($pessoa) {
            $obj = Funcoes::objetoParaArray($pessoa);
            
            $obj["Enderecos"] = array_map(function($x){
                $endereco = get_object_vars($x);

                $categoriaEndereco = Funcoes::objetoParaArray((New CategoriaEnderecoData)->buscarPorId($endereco["IdCategoriaEndereco"]));
                $endereco["CategoriaEndereco"] = $categoriaEndereco;
                unset($endereco["IdCategoriaEndereco"]);

                $cidade = Funcoes::objetoParaArray((New CidadeData)->buscarPorId($endereco["IdCidade"]));
                $estado = Funcoes::objetoParaArray((New EstadoData)->buscarPorId($cidade["IdEstado"]));
                $cidade["Estado"] = $estado;
                $endereco["Cidade"] = $cidade;
                unset($cidade["IdEstado"]);
                unset($endereco["IdCidade"]);

                return $endereco;
            }, $obj["Enderecos"]);

            $obj["Telefones"] = array_map(function($x){
                $telefone = get_object_vars($x);

                $categoriaTelefone = Funcoes::objetoParaArray((New CategoriaTelefoneData)->buscarPorId($telefone["IdCategoriaTelefone"]));
                $telefone["CategoriaTelefone"] = $categoriaTelefone;
                unset($telefone["IdCategoriaTelefone"]);

                return $telefone;
            }, $obj["Telefones"]);

            $obj["Emails"] = array_map(function($x){
                $email = get_object_vars($x);

                $categoriaEmail = Funcoes::objetoParaArray((New CategoriaEmailData)->buscarPorId($email["IdCategoriaEmail"]));
                $email["CategoriaEmail"] = $categoriaEmail;
                unset($email["IdCategoriaEmail"]);

                return $email;
            }, $obj["Emails"]);

            return $obj;
        }
    }
?>