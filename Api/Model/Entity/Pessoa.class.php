<?php
    class Pessoa{
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

        function setIdPessoa() {$this->idPessoa = $idPessoa;}
        function setTipoPessoa() {$this->tipoPessoa = $tipoPessoa;}
        function setNomeRazao() {$this->nomeRazao = $nomeRazao;}
        function setApelidoFantasia() {$this->apelidoFantasia = $apelidoFantasia;}
        function setCPFCNPJ() {$this->cPFCNPJ = $cPFCNPJ;}
        function setRGInscricao() {$this->rGInscricao = $rGInscricao;}
        function setDataNascimento() {$this->dataNascimento = $dataNascimento;}
        function setGenero() {$this->genero = $genero;}
        function setInativo() {$this->inativo = $inativo;}
        function setDataInclusao() {$this->dataInclusao = $dataInclusao;}

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