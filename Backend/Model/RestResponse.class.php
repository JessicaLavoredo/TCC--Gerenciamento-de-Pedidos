<?php
    class RestResponse implements JsonSerializable{
        private $statusCode;
        private $message;
        private $data;
        
        function getStatusCode() {return $this->statusCode;}
        function getMessage() {return $this->message;}
        function getData() {return $this->data;}

        function setStatusCode($statusCode) {$this->statusCode = $statusCode;}
        function setMessage($message) {$this->message = $message;}
        function setData($data) {$this->data = $data;}

        function __construct($statusCode = null, $message = null, $data = null) {
            $this->setStatusCode($statusCode);
            $this->setMessage($message);
            $this->setData($data);

            return json_encode($data);
        }

        public function jsonSerialize(){
            $propriedades = Funcoes::getPropriedades($this);

            foreach($propriedades as $prop) {
                $get = "get".ucfirst($prop);
                $valor = $this->$get() ?? '';
                $ret[$prop] = $valor;
            }
            
            return $ret;
        }
    }
?>