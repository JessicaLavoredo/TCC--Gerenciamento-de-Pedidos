<?php
    class Cidade extends BaseEntity {
        private $idCidade;
        private $nome;
        private $codigoIBGE;
        private Estado $estado;

        function getIdCidade() {return $this->idCidade;}
        function getNome() {return $this->nome;}
        function getCodigoIBGE() {return $this->codigoIBGE;}
        function getEstado() {return $this->estado;}

        function setIdCidade($idCidade) {$this->idCidade = $idCidade;}
        function setNome($nome) {$this->nome = $nome;}
        function setCodigoIBGE($codigoIBGE) {$this->codigoIBGE = $codigoIBGE;}
        function setEstado($estado) {$tipo = gettype($estado); if(gettype($estado) !== "object" || get_class($estado) !== "Estado"){$estado = new Estado();} $this->estado = $estado;}

        function __construct($idCidade=null, $nome=null, $codigoIBGE=null, $estado=null) {
            $this->setIdCidade($idCidade);
            $this->setNome($nome);
            $this->setCodigoIBGE($codigoIBGE);
            $this->setEstado($estado);
        }
    }
?>