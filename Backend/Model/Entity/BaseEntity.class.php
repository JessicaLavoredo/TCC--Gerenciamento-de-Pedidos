<?php

    abstract class BaseEntity implements JsonSerializable{
        
        public function jsonSerialize()
        {
            $propriedades = Funcoes::getPropriedades($this);

            foreach($propriedades as $prop) {
                $get = "get".ucfirst($prop);
                $ret[ucfirst($prop)] = $this->$get();
            }
            
            return $ret;
        }
    }