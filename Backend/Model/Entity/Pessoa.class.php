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
        
        private function addEndereco(Endereco $endereco){
            $this->enderecos[] = $endereco;
        }
        function setEnderecos($enderecos) {
            $this->enderecos = array();
            if (isset($enderecos)){
                foreach ($enderecos as $endereco) {
                    $entidade = (New Funcoes())->criarEntidade("Endereco", $endereco);
                    $this->addEndereco($entidade);
                }
            }
        }
        
        private function addTelefone(Telefone $telefone){
            $this->telefones[] = $telefone;
        }
        function setTelefones($telefones) {
            $this->telefones = array();
            if (isset($telefones)){
                foreach ($telefones as $telefone){
                    $entidade = (New Funcoes())->criarEntidade("Telefone", $telefone);
                    $this->addTelefone($entidade);
                }
            }
        }

        private function addEmail(Email $email){
            $this->emails[] = $email;
        }
        function setEmails($emails) {
            $this->emails = array();
            if (isset($emails)){
                foreach ($emails as $email){
                    $entidade = (New Funcoes())->criarEntidade("Email", $email);
                    $this->addEmail($entidade);
                }
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