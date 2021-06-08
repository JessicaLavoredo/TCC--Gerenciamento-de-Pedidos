<?php
    class ProdutoData extends BaseData {
        function __construct() {
            parent::__construct();
        }

        function gravar($entidade) {
            try {
                $propriedadesProduto = Funcoes::getPropriedades("Produto");
                $propriedadesProduto = array_filter($propriedadesProduto, function($x){if(strtoupper($x) !== strtoupper("IdProduto") && strtoupper($x) !== strtoupper("Vista") && strtoupper($x) !== strtoupper("Prazo")){return true;}else{return false;}});

                if($entidade->getIdProduto() > 0) {
                    $sql = "UPDATE Produto\n";
                    $sql .= "SET ";
                    foreach ($propriedadesProduto as $prop) {
                        $sql .= $prop." = :".$prop.", ";
                    }
                    $sql = substr_replace($sql,"\n",-2);
                    $sql .= "WHERE IdProduto = :IdProduto";

                    $stm = $this->db->prepare($sql);
                    $stm->bindValue(":IdProduto", $entidade->getIdProduto());
                    foreach ($propriedadesProduto as $prop) {
                        $get = "get".$prop;
                        $stm->bindValue(":".$prop, $entidade->$get());
                    }
                    $stm->execute();
                    $ultimoId = $entidade->getIdPessoa();

                    $precoProduto = New ListaPrecoProduto(null, 1, $ultimoId, $entidade->getVista(), $entidade->getPrazo());
                    $propriedadesPrecoProduto = array_filter(Funcoes::getPropriedades("ListaPrecoProduto"), function($x){if(strtoupper($x) !== strtotupper("IdListaPrecoProduto") && strtoupper($x) !== strtotupper("IdProduto")){return true;}else{return false;}});
                    $sql = "UPDATE ListaPrecoProduto\n";
                    $sql.= "SET ";
                    foreach ($propriedadesPrecoProduto as $prop) {
                        $sql.= $prop." = :".$prop.", ";
                    }
                    $sql = substr_replace($sql,"\n",-2);
                    $sql.= "WHERE IdListaPrecoProduto = 1 AND IdProduto = :IdProduto";

                    $stm = $this->db->prepare($sql);
                    $stm->bindValue(":IdProduto", $entidade->getIdProduto());
                    foreach($propriedadesPrecoProduto as $prop){
                        $get = "get".$prop;
                        $stm->bindValue(":".$prop, $precoProduto->$get());
                    }
                    $stm->execute();
                } else {
                    $sql = "INSERT INTO Produto (".join(", ", $propriedadesProduto).")\n";
                    $sql.= "VALUES (";
                    foreach($propriedadesProduto as $prop){
                        $sql.= ":".$prop.", ";
                    }
                    $sql = substr_replace($sql,")\n",-2);

                    $stm = $this->db->prepare($sql);
                    foreach($propriedadesProduto as $prop){
                        $get = "get".$prop;
                        $stm->bindValue(":".$prop, $entidade->$get());
                    }
                    $stm->execute();
                    $ultimoId = $this->db->lastInsertId();

                    $precoProduto = New ListaPrecoProduto(null, 1, $ultimoId, $entidade->getVista(), $entidade->getPrazo());
                    (New ListaPrecoProdutoData())->gravar($precoProduto);
                }

                return "Registro gravado com sucesso.";
            } catch (Exception $e) {
                return "Erro ao gravar no banco.";
            }
        }
        
        function buscarPorId($id) {
            $sql = "SELECT P.*, LPP.Vista, LPP.Prazo\n";
            $sql.= "FROM Produto P\n";
            $sql.= "INNER JOIN ListaPrecoProduto LPP ON LPP.IdProduto = P.IdProduto\n";
            $sql.= "WHERE P.Inativo = 0\n";
            $sql.= "AND P.IdProduto = '".$id."' OR P.CodigoInterno = '".$id."'";
            $stm = $this->db->prepare($sql);
            $stm->execute();
            $ret = $stm->fetch();
            if ($ret === false) {
                return;
            }
            return Funcoes::criarEntidade('Produto', $ret);
        }

        function buscarPorFiltro($entidade){
            $sql = "SELECT P.*, LPP.Vista, LPP.Prazo\n";
            $sql.= "FROM Produto P\n";
            $sql.= "INNER JOIN ListaPrecoProduto LPP ON LPP.IdProduto = P.IdProduto\n";
            $sql.= "WHERE ";

            $propriedades = Funcoes::getPropriedades("Produto");
            $filtros = array();
            foreach($propriedades as $prop) {
                $getProp = 'get'.ucfirst($prop);
                $valor = $entidade->$getProp();
                if ($valor) {
                    if ($prop === "Vista" || $prop === "Prazo") {
                        $filtros[] = "LPP.".$prop." LIKE '%".$valor."%'";   
                    } else {
                        $filtros[] = "P.".$prop." LIKE '%".$valor."%'";
                    }
                } else {
                    unset($propriedades[array_search($prop, $propriedades)]);
                }
            }
            $filtros[] = "P.Inativo = 0";
            $sql.= implode("\nAND ", $filtros);

            $stm = $this->db->prepare($sql);
            $stm->execute();
            $linhas = $stm->fetchAll();
            $ret = array();
            foreach($linhas as $linha){
                $ret[] = Funcoes::criarEntidade("Produto", $linha);
            }
            return $ret;
        }
    }
?>