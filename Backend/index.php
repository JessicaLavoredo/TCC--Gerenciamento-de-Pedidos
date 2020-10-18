<?php

    require_once "autoload.php";

    header('Content-Type: application/json; charset: utf-8');
	header("Access-Control-Allow-Headers: Authorization, Content-Type");
	header("Access-Control-Allow-Origin: *");
	header('content-type: application/json; charset=utf-8');
	
    if (isset($_REQUEST['url'])) {
        $url = explode('/', $_REQUEST['url']);
        $classe = ucfirst(array_shift($url)).'Controller';
        $metodo = array_shift($url);

        switch($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $parametros = $url;
                break;
            case "POST":
                $json = file_get_contents("php://input");
                $obj = json_decode($json,true);
                $parametros = $obj;
                break;
            default: 
                ;
                break;
        } 

        $ret = (New $classe())->$metodo($parametros);
        return file_put_contents("php://output",json_encode($ret));
    }

    // if (isset($_REQUEST)) {
    //     var_dump($json);
    //     var_dump($_REQUEST);
    //     $url = explode('/', $_REQUEST['url']);
    //     $controller = $url[0]."Controller";
    //     $method = $url[1];
    //     require_once "./Controller/".$controller.".class.php";
    //     return (New $controller())->$method();
    // } else {
        
    // }
?>