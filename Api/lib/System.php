<?php

namespace lib;

class System extends Router{
    private $url;
    private $exploder;
    private $area;
    private $controller;
    private $action;
    private $params;

    private function setUrl() {
        // $this-> = isset($_GET['url']) ? $_GET['url'] : 'home/index';
    }

    private function setExploder() {
        $this->exploder = explode('/', $this->url);
    }
    
}