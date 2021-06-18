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
                    $valores = array();
                    foreach($propriedadesPessoa as $prop){
                        $valores[] = ":".$prop;
                    }
                    $sql.= implode(', ', $valores).")";

                    $stm = $this->db->prepare($sql);
                    foreach($propriedadesPessoa as $prop){
                        $get = "get".ucfirst($prop);
                        $stm->bindValue(':'.$prop, $entidade->$get());
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

        function buscarPorFiltro($obj){

            $vinculos = $obj["Vinculos"] ?? array();
            unset($obj["Vinculos"]);

            $enderecos = $obj["Enderecos"] ?? array();
            unset($obj["Enderecos"]);

            $emails = $obj["Emails"] ?? array();
            unset($obj["Emails"]);

            $telefones = $obj["Telefones"] ?? array();
            unset($obj["Telefones"]);

            $sql = "SELECT DISTINCT P.* FROM Pessoa P\n";
            $sql.= "INNER JOIN Endereco E ON E.IdPessoa = P.IdPessoa\n";
            $sql.= "INNER JOIN Cidade C ON C.IdCidade = E.IdCidade\n";
            $sql.= "INNER JOIN Estado UF ON UF.IdEstado = C.IdEstado\n";
            $sql.= "INNER JOIN Email EM ON EM.IdPessoa = P.IdPessoa\n";
            $sql.= "INNER JOIN Telefone T ON T.IdPessoa = P.IdPessoa\n";
            $sql.= "INNER JOIN VinculoPessoa VP ON VP.IdPessoa = P.IdPessoa\n";
            $sql.= "WHERE ";

            $filtros = array();
            foreach($obj as $chave => $valor) {
                if($obj[$chave]) {
                    $filtros[] = "P.".$chave." LIKE '%".$valor."%'";
                }
            }
            foreach($vinculos as $vin) {
                if($vin){
                    $filtros[] = "VP.IdVinculo LIKE '%".$vin."%'" ;
                }
            }
            foreach($telefones as $telefone){
                if($telefone){
                    $telefone = Funcoes::objetoParaArray($telefone);
                    foreach($telefone as $chave => $valor) {
                        if($telefone[$chave]){
                            $filtros[] = "T.".$chave." LIKE '%".$valor."%'";
                        }
                    }
                }
            }
            foreach($emails as $email){
                if($email){
                    $email = Funcoes::objetoParaArray($email);
                    foreach($email as $chave => $valor) {
                        if($email[$chave]){
                            $filtros[] = "EM.".$chave." LIKE '%".$valor."%'";
                        }
                    }
                }
            }
            foreach($enderecos as $endereco) {
                if ($endereco) {
                    $endereco = Funcoes::objetoParaArray($endereco);
                    foreach($endereco as $chave => $valor) {
                        if($endereco[$chave]) {
                            if($chave === "Cidade"){
                                foreach($valor as $chave2 => $valor2){
                                    if($chave2 === "Estado"){
                                        foreach($valor2 as $chave3 => $valor3){
                                            $filtros[] = "UF.".$chave3." LIKE '%".$valor3."%'";
                                        }
                                    } else {
                                        $filtros[] = "C.".$chave2." LIKE '%".$valor2."%'";
                                    }
                                }
                            } else {
                                $filtros[] = "E.".$chave." LIKE '%".$valor."%'";
                            }
                        }
                    }
                }
            }
            $sql.= implode("\nAND ", $filtros);

            $stm = $this->db->prepare($sql);
            $stm->execute();
            $linhas = $stm->fetchAll();
            $ret = array();
            foreach($linhas as $linha){
                $pessoa = Funcoes::criarEntidade("Pessoa", $linha);
                $idPessoa = $pessoa->getIdPessoa();

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
                $vinculos = [];
                foreach($linhas as $linha){
                    if ($linha){
                        $vinculos[] = $linha["IdVinculo"];
                    }
                }
                $pessoa->setVinculos($vinculos);
                $ret[] = $pessoa;
            }
            return $ret;
        }

        function buscarPorId($idPessoa) {
            try {
                $sql = "SELECT * FROM Pessoa P\n";
                $sql.= "WHERE P.IdPessoa = ".$idPessoa;
                $stm = $this->db->prepare($sql);
                $stm->execute();
                $objPessoa = $stm->fetch();
                if ($objPessoa === false) {
                    return;
                }
                $pessoa = Funcoes::criarEntidade("Pessoa", $objPessoa);

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
                $vinculos = [];
                foreach($linhas as $linha){
                    if ($linha){
                        $vinculos[] = $linha["IdVinculo"];
                    }
                }
                $pessoa->setVinculos($vinculos);
             
                return $pessoa;
            } catch (Exception $e){
                return "Erro ".$e->getMessage();
            }
        }
    } // fim da classe
?>