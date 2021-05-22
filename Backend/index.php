<?php

    require_once "autoload.php";
    require_once "errorHandler.php";
    require_once "./Model/RestResponse.class.php";

    header('Content-Type: Application/Json; Charset: UTF-8');
    header("Access-Control-Allow-Headers: Authorization, Content-Type");
	header("Access-Control-Allow-Origin: *");

    date_default_timezone_set('America/Sao_Paulo');

    try {

        // Valida se existe um caminho na requisição e se possui ao menos 2 parametros Controller e Método
        if (!isset($_REQUEST['url']) || count(explode('/', $_REQUEST['url'])) < 2) {
            http_response_code(404);
            return;
        }

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
                break;
        } 

        if (strtoupper($classe) === 'USUARIOCONTROLLER' && strtoupper($metodo) === 'LOGIN') {
            $retorno = (New $classe())->$metodo($parametros);    
            http_response_code(200);
            $ret = json_encode($retorno);
            $ret = file_put_contents("php://output", $ret);
            return $ret;
        } 

        $cabecalhos = array_change_key_case(apache_request_headers(), CASE_UPPER);
        if (!isset($cabecalhos['AUTHORIZATION'])){
            http_response_code(400);
            return;
        }

        $authorization = $cabecalhos['AUTHORIZATION'];
        $token = explode(' ', $authorization)[1];
        
        if (!AuthController::validarToken($token)) {
            http_response_code(401);
            return;
        } else {
            $retorno = (New $classe())->$metodo($parametros);
        }

    } catch (Exception $e) {
        http_response_code(500);
        $retorno = ['Exception' => $e->getMessage() . ' in ' . $e->getFile() . ' line ' . $e->getLine()];
    }

    if (is_null($retorno)) {
        return;
    }
    $ret = json_encode($retorno);
    return file_put_contents("php://output", $ret);

?>