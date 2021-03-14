<?php
    class Pessoa extends BaseEntity {
        private $idPessoa;
        private $tipoPessoa;
        private $nomeRazao;
        private $apelidoFantasia;
        private $cpfCnpj;
        private $rgInscricao;
        private $dataNascimento;
        private $genero;
        private $inativo;
        private $dataInclusao;
        private Array $vinculos;
        private Array $enderecos;
        private Array $telefones;
        private Array $emails;

        function getIdPessoa() {return $this->idPessoa;}
        function getTipoPessoa() {return $this->tipoPessoa;}
        function getNomeRazao() {return $this->nomeRazao;}
        function getApelidoFantasia() {return $this->apelidoFantasia;}
        function getCpfCnpj() {return $this->cpfCnpj;}
        function getRgInscricao() {return $this->rgInscricao;}
        function getDataNascimento() {return $this->dataNascimento;}
        function getGenero() {return $this->genero;}
        function getInativo() {return $this->inativo;}
        function getDataInclusao() {return $this->dataInclusao;}
        function getVinculos() {return $this->vinculos;}
        function getEnderecos() {return $this->enderecos;}
        function getTelefones() {return $this->telefones;}
        function getEmails() {return $this->emails;}

        function setIdPessoa($idPessoa) {$this->idPessoa = $idPessoa;}
        function setTipoPessoa($tipoPessoa) {$this->tipoPessoa = $tipoPessoa;}
        function setNomeRazao($nomeRazao) {$this->nomeRazao = $nomeRazao;}
        function setApelidoFantasia($apelidoFantasia) {$this->apelidoFantasia = $apelidoFantasia;}
        function setCpfCnpj($cpfCnpj) {$this->cpfCnpj = $cpfCnpj;}
        function setRgInscricao($rgInscricao) {$this->rgInscricao = $rgInscricao;}
        function setDataNascimento($dataNascimento) {$this->dataNascimento = $dataNascimento;}
        function setGenero($genero) {$this->genero = $genero;}
        function setInativo($inativo) {$this->inativo = $inativo;}
        function setDataInclusao($dataInclusao) {$this->dataInclusao = $dataInclusao;}

        function setVinculos($vinculos) {
            $this->vinculos = array();
            if (isset($vinculos)) {
                $this->vinculos = $vinculos;
            }
        }
        
        private function addEndereco(Endereco $endereco){
            $this->enderecos[] = $endereco;
        }
        function setEnderecos($enderecos) {
            $this->enderecos = array();
            if (isset($enderecos)){
                foreach ($enderecos as $endereco) {
                    $entidade = Funcoes::criarEntidade("Endereco", $endereco);
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
                    $entidade = Funcoes::criarEntidade("Telefone", $telefone);
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
                    $entidade = Funcoes::criarEntidade("Email", $email);
                    $this->addEmail($entidade);
                }
            }
        }

        function __construct($idPessoa=null, $tipoPessoa=null, $nomeRazao=null, $apelidoFantasia=null, $cpfCnpj=null, $rgInscricao=null,
        $dataNascimento=null, $genero=null, $inativo=null, $dataInclusao=null, $vinculos=null, $enderecos=null, $telefones=null, $emails=null) {
            $this->setIdPessoa($idPessoa);
            $this->setTipoPessoa($tipoPessoa);
            $this->setNomeRazao($nomeRazao);
            $this->setApelidoFantasia($apelidoFantasia);
            $this->setCpfCnpj($cpfCnpj);
            $this->setRgInscricao($rgInscricao);
            $this->setDataNascimento($dataNascimento);
            $this->setGenero($genero);
            $this->setInativo($inativo);
            $this->setDataInclusao($dataInclusao);
            $this->setVinculos($vinculos);
            $this->setEnderecos($enderecos);
            $this->setTelefones($telefones);
            $this->setEmails($emails);
        }

    }
?>