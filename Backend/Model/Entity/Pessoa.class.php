<?php
    class Pessoa {
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
        private Array $enderecos;
        private Array $telefones;
        private Array $emails;

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
        function getEnderecos() {return $this->enderecos;}
        function getTelefones() {return $this->telefones;}
        function getEmails() {return $this->emails;}

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
        
        function addEndereco(Endereco $endereco){
            $this->enderecos[] = $endereco;
        }
        function setEnderecos($enderecos) {
            $this->enderecos = array();
            if (isset($enderecos)){
                array_walk($enderecos, function($x){
                    $y = (New Funcoes())->criarEntidade('Endereco', $x);
                    $this->addEndereco($y);
                });
            }
        }
        
        function addTelefone(Telefone $telefone){
            $this->telefones[] = $telefone;
        }
        function setTelefones($telefones) {
            $this->telefones = array();
            if (isset($telefones)){
                array_walk($telefones, function($x){
                    $entidade = (New Funcoes())->criarEntidade('Telefone', $x);
                    $this->addTelefone($y);
                });
            }
        }

        function addEmail(Email $email){
            $this->emails[] = $email;
        }
        function setEmails($emails) {
            $this->emails = array();
            if (isset($emails)){
                array_walk($telefones, function($x){
                    $entidade = (New Funcoes())->criarEntidade('Email', $x);
                    $this->addEmail($y);
                });
            }
        }

        function __construct($idPessoa=null, $tipoPessoa=null, $nomeRazao=null, $apelidoFantasia=null, $cPFCNPJ=null, $rGInscricao=null, $dataNascimento=null, $genero=null, $inativo=null, $dataInclusao=null, $enderecos=null, $telefones=null, $emails=null) {
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
            $this->setEnderecos($enderecos);
            $this->setTelefones($telefones);
            $this->setEmails($emails);
        }
    }
?>