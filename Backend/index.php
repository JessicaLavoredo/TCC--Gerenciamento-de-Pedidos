<?php

    require_once "autoload.php";
    require_once "./Model/RestResponse.class.php";

    header('Content-Type: application/json; charset: utf-8');
    header("Access-Control-Allow-Headers: Authorization, Content-Type");
	header("Access-Control-Allow-Origin: *");

    try {

        if (isset($_REQUEST['url'])) {
            $url = explode('/', $_REQUEST['url']);
            $classe = ucfirst(array_shift($url)).'Controller';
            $metodo = array_shift($url);

            switch($_SERVER['REQUEST_METHOD']) {
                case "GET":
                    if (count($url) === 1) {
                        $parametros = array_shift($url);
                    } else {
                        $parametros = $url;
                    }
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
            $ret = file_put_contents("php://output",json_encode($ret));
            return $ret;
        }

    } catch (Exception $e) {
        return New RestResponse(500, "Internal Server Error.", null);
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