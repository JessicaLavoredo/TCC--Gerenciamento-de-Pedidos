<?php
    class PessoaData extends BaseData{
        function __construct() {
            parent::__construct();
        }

        function gravar($entidade) {
            try {
                $propriedadesPessoa = (New Funcoes())->getPropriedades("Pessoa");
                $propriedadesPessoa = array_filter($propriedadesPessoa, function($x){if($x != "Enderecos" && $x != "Telefones" && $x != "Emails"){return true;}else{return false;}});

                $sql = "INSERT INTO Pessoa (".join(", ", $propriedadesPessoa).")\n";
                $sql.= "VALUES (";
                foreach($propriedadesPessoa as $prop){
                    $get = "get".$prop;
                    $sql.= (New Funcoes())->preparaDadoSql($entidade->$get()).", ";
                }
                $sql = substr_replace($sql,")\n",-2);

                $stm = $this->db->prepare($sql);
                $stm->execute();
                $ultimoId = $this->db->lastInsertId();

                foreach($entidade->getEnderecos() as $endereco){
                    $endereco->setIdPessoa($ultimoId);
                    (New EnderecoData())->gravar($endereco);
                }

                foreach($entidade->getTelefones() as $telefone){
                    $telefone->setIdPessoa($ultimoId);
                    (New TelefoneData())->gravar($telefone);
                }

                foreach($entidade->getEmails() as $email){
                    $email->setIdPessoa($ultimoId);
                    (New EmailData())->gravar($email);
                }
                return "Registro gravado com sucesso.";
            } catch (Exception $e) {
                return "Erro ao gravar no banco.";
            }
        }
    } // fim da classe
?>