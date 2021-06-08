<?php
    class HistoricoPedido extends BaseEntity {
        private ?int $idHistoricoPedido;
        private ?int $idPedido;
        private ?int $idStatusPedido;
        private ?string $dataMovimentacao;
        private ?int $idUsuarioMovimentadoPor;
        
        function getIdHistoricoPedido() {return $this->idHistoricoPedido;}
        function getIdPedido() {return $this->idPedido;}
        function getIdStatusPedido() {return $this->idStatusPedido;}
        function getDataMovimentacao() {return $this->dataMovimentacao;}
        function getIdUsuarioMovimentadoPor() {return $this->idUsuarioMovimentadoPor;}

        function setIdHistoricoPedido($idHistoricoPedido) {$this->idHistoricoPedido = $idHistoricoPedido;}
        function setIdPedido($idPedido) {$this->idPedido = $idPedido;}
        function setIdStatusPedido($idStatusPedido) {$this->idStatusPedido = $idStatusPedido;}
        function setDataMovimentacao($dataMovimentacao) {$this->dataMovimentacao = $dataMovimentacao;}
        function setIdUsuarioMovimentadoPor($idUsuarioMovimentadoPor) {$this->idUsuarioMovimentadoPor = $idUsuarioMovimentadoPor;}

        function __construct($idHistoricoPedido=null, $idPedido=null, $idStatusPedido=null, $dataMovimentacao=null, $idUsuarioMovimentadoPor=null) {
            $this->setIdHistoricoPedido($idHistoricoPedido);
            $this->setIdPedido($idPedido);
            $this->setIdStatusPedido($idStatusPedido);
            $this->setDataMovimentacao($dataMovimentacao);
            $this->setIdUsuarioMovimentadoPor($idUsuarioMovimentadoPor);
        }
    }
?>