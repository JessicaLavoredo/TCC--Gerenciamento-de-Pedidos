<?php
    class PessoaController extends BaseController {
        
        function buscarPorId($id){
            $classe = str_ireplace('Controller', 'Data', get_class($this));
            $pessoa = (New $classe())->buscarPorId($id);
            if (!isset($pessoa)){
                return;
            }
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