<?php
    class Pessoa extends PessoaData {
        private $idPessoa;
        private $tipoPessoa;
        private $nomeRazao;
        private $apelidoFantasia;
        private $cPFCNPJ;
        private $rGInscricao;
        private $dataNascimento;
        private $genero;
        private $inativo;
        private $dataInclusao;

        function getIdPessoa() {return $this->idPessoa;}
        function getTipoPessoa() {return $this->tipoPessoa;}
        function getNomeRazao() {return $this->nomeRazao;}
        function getApelidoFantasia() {return $this->apelidoFantasia;}
        function getCPFCNPJ() {return $this->cPFCNPJ;}
        function getRGInscricao() {return $this->rGInscricao;}
        function getDataNascimento() {return $this->dataNascimento;}
        function getGenero() {return $this->genero;}
        function getInativo() {return $this->inativo;}
        function getDataInclusao() {return $this->dataInclusao;}

        function setIdPessoa($idPessoa) {$this->idPessoa = $idPessoa;}
        function setTipoPessoa($tipoPessoa) {$this->tipoPessoa = $tipoPessoa;}
        function setNomeRazao($nomeRazao) {$this->nomeRazao = $nomeRazao;}
        function setApelidoFantasia($apelidoFantasia) {$this->apelidoFantasia = $apelidoFantasia;}
        function setCPFCNPJ($cPFCNPJ) {$this->cPFCNPJ = $cPFCNPJ;}
        function setRGInscricao($rGInscricao) {$this->rGInscricao = $rGInscricao;}
        function setDataNascimento($dataNascimento) {$this->dataNascimento = $dataNascimento;}
        function setGenero($genero) {$this->genero = $genero;}
        function setInativo($inativo) {$this->inativo = $inativo;}
        function setDataInclusao($dataInclusao) {$this->dataInclusao = $dataInclusao;}

        function __construct($idPessoa="", $tipoPessoa="", $nomeRazao="", $apelidoFantasia="", $cPFCNPJ="", $rGInscricao="", $dataNascimento="", $genero="", $inativo="", $dataInclusao="") {
            $this->setIdPessoa($idPessoa);
            $this->setTipoPessoa($tipoPessoa);
            $this->setNomeRazao($nomeRazao);
            $this->setApelidoFantasia($apelidoFantasia);
            $this->setCPFCNPJ($cPFCNPJ);
            $this->setRGInscricao($rGInscricao);
            $this->setDataNascimento($dataNascimento);
            $this->setGenero($genero);
            $this->setInativo($inativo);
            $this->setDataInclusao($dataInclusao);
        }
    }
?>