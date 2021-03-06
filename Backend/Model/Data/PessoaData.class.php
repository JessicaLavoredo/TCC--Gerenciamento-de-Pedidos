<?php
    class PessoaData extends BaseData{
        function __construct() {
            parent::__construct();
        }

        function gravar($entidade) {
            try {
                $propriedadesPessoa = Funcoes::getPropriedades("Pessoa");
                $propriedadesPessoa = array_filter($propriedadesPessoa, function($x){if(strtoupper($x) !== strtoupper("IdPessoa") && strtoupper($x) !== strtoupper("Enderecos") && strtoupper($x) !== strtoupper("Telefones") && strtoupper($x) !== strtoupper("Emails") && strtoupper($x) !== strtoupper("Vinculos")){return true;}else{return false;}});

                if ($entidade->getIdPessoa() > 0) {
                    $sql = "UPDATE Pessoa\n";
                    $sql .= "SET ";
                    foreach ($propriedadesPessoa as $prop){
                        $sql .= $prop." = :".$prop.", ";
                    }
                    $sql = substr_replace($sql,"\n",-2);
                    $sql .= "WHERE IdPessoa = :IdPessoa";

                    $stm = $this->db->prepare($sql);
                    $stm->bindValue(":IdPessoa", $entidade->getIdPessoa());
                    foreach($propriedadesPessoa as $prop){
                        $get = "get".$prop;
                        $stm->bindValue(":".$prop, $entidade->$get());
                    }
                    $stm->execute();
                    $ultimoId = $entidade->getIdPessoa();
                } else {
                    $sql = "INSERT INTO Pessoa (".join(", ", $propriedadesPessoa).")\n";
                    $sql.= "VALUES (";
                    foreach($propriedadesPessoa as $prop){
                        $sql.= ":".$prop.", ";
                    }
                    $sql = substr_replace($sql,")\n",-2);

                    $stm = $this->db->prepare($sql);
                    foreach($propriedadesPessoa as $prop){
                        $get = "get".$prop;
                        $stm->bindValue(":".$prop, $entidade->$get());
                    }
                    $stm->execute();
                    $ultimoId = $this->db->lastInsertId();
                }

                (New VinculoPessoaData())->deletarTodosPorIdPessoa($ultimoId);
                if(count($entidade->getVinculos()) > 0){
                    foreach ($entidade->getVinculos() as $vinculo) {
                        $vinculoPessoa = new VinculoPessoa(null, $vinculo, $ultimoId);
                        (New VinculoPessoaData())->gravar($vinculoPessoa);
                    }
                }

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

        function buscarPorId($idPessoa) {
            try {
                $sql = "SELECT * FROM Pessoa P\n";
                $sql.= "WHERE P.IdPessoa = ".$idPessoa;
                $stm = $this->db->prepare($sql);
                $stm->execute();
                $linha = $stm->fetch();
                $pessoa = Funcoes::criarEntidade("Pessoa", $linha);
    
                $sql = "SELECT * FROM Endereco E\n";
                $sql.= "WHERE E.IdPessoa = ".$idPessoa;
                $stm = $this->db->prepare($sql);
                $stm->execute();
                $enderecos = $stm->fetchAll();
                $pessoa->setEnderecos($enderecos);
    
                $sql = "SELECT * FROM Telefone T\n";
                $sql.= "WHERE T.IdPessoa = ".$idPessoa;
                $stm = $this->db->prepare($sql);
                $stm->execute();
                $telefones = $stm->fetchAll();
                $pessoa->setTelefones($telefones);
    
                $sql = "SELECT * FROM Email E\n";
                $sql.= "WHERE E.IdPessoa = ".$idPessoa;
                $stm = $this->db->prepare($sql);
                $stm->execute();
                $emails = $stm->fetchAll();
                $pessoa->setEmails($emails);
    
                $sql = "SELECT * FROM VinculoPessoa VP\n";
                $sql.= "WHERE VP.IdPessoa = ".$idPessoa;
                $stm = $this->db->prepare($sql);
                $stm->execute();
                $linhas = $stm->fetchAll();
                foreach($linhas as $linha){
                    $vinculos[] = $linha["IdVinculo"];
                }
                $pessoa->setVinculos($vinculos);
            } catch (Exception $e){
                return "Erro ".$e->getMessage();
            }
            return $pessoa;
        }
    } // fim da classe
?>