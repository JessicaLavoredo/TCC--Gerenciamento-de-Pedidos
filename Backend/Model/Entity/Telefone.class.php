<?php
    class Telefone extends BaseEntity {
        private ?int $idTelefone;
        private ?int $idPessoa;
        private ?string $dDI;
        private ?string $dDD;
        private ?string $numero;
        private ?string $ramal;
        private ?int $idCategoriaTelefone;
        private ?string $observacao;
        
        function getIdTelefone():?int {return $this->idTelefone;}
        function getIdPessoa():?int {return $this->idPessoa;}
        function getDDI():?string {return $this->dDI;}
        function getDDD():?string {return $this->dDD;}
        function getNumero():?string {return $this->numero;}
        function getRamal():?string {return $this->ramal;}
        function getIdCategoriaTelefone():?int {return $this->idCategoriaTelefone;}
        function getObservacao():?string {return $this->observacao;}

        function setIdTelefone(?int $idTelefone) {$this->idTelefone = $idTelefone;}
        function setIdPessoa(?int $idPessoa) {$this->idPessoa = $idPessoa;}
        function setDDI(?string $dDI) {$this->dDI = $dDI;}
        function setDDD(?string $dDD) {$this->dDD = $dDD;}
        function setNumero(?string $numero) {$this->numero = $numero;}
        function setRamal(?string $ramal) {$this->ramal = $ramal;}
        function setIdCategoriaTelefone(?int $idCategoriaTelefone) {$this->idCategoriaTelefone = $idCategoriaTelefone;}
        function setObservacao(?string $observacao) {$this->observacao = $observacao;}

        function __construct($idTelefone=null, $idPessoa=null, $dDI=null, $dDD=null, $numero=null, $ramal=null, $idCategoriaTelefone=null, $observacao=null) {
            $this->setIdTelefone($idTelefone);
            $this->setIdPessoa($idPessoa);
            $this->setDDI($dDI);
            $this->setDDD($dDD);
            $this->setNumero($numero);
            $this->setRamal($ramal);
            $this->setIdCategoriaTelefone($idCategoriaTelefone);
            $this->setObservacao($observacao);
        }
    }
?>