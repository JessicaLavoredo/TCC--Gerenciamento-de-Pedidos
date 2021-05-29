<?php
    class Cidade extends BaseEntity {
        private ?int $idCidade;
        private ?string $nome;
        private ?int $codigoIBGE;
        private ?int $idEstado;

        function getIdCidade() {return $this->idCidade;}
        function getNome() {return $this->nome;}
        function getCodigoIBGE() {return $this->codigoIBGE;}
        function getIdEstado() {return $this->idEstado;}

        function setIdCidade($idCidade) {$this->idCidade = $idCidade;}
        function setNome($nome) {$this->nome = $nome;}
        function setCodigoIBGE($codigoIBGE) {$this->codigoIBGE = $codigoIBGE;}
        function setIdEstado($idEstado) {$this->idEstado = $idEstado;}

        function __construct($idCidade=null, $nome=null, $codigoIBGE=null, $idEstado=null) {
            $this->setIdCidade($idCidade);
            $this->setNome($nome);
            $this->setCodigoIBGE($codigoIBGE);
            $this->setIdEstado($idEstado);
        }
    }
?>