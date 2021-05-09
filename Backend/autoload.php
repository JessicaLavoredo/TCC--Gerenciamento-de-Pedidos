<?php

    spl_autoload_register(function ($classe) {

        $diretorios =  [
            'Controller' => './Controller/',
            'Business' => './Model/Business/',
            'Data' => './Model/Data/',
            'Entity' => './Model/Entity/',
            'Model' => './Model/'
        ];
        try {

            foreach ($diretorios as $d)  {
                $arquivo = $d.$classe.'.class.php';
                if (file_exists($arquivo)) {
                    require_once $arquivo;
                }
            }

            // switch($classe){
            //     case strpos($classe, "Data", strlen($classe)-4) > 0:
            //         include_once "./Model/Data/".$classe.".class.php";
            //         break;
            //     case strpos($classe, "Business", strlen($classe)-8) > 0:
            //         include_once "./Model/Business/".$classe.".class.php";
            //         break;
            //     case strpos($classe, "Controller", strlen($classe)-10) > 0:
            //         include_once "./Controller/".$classe.".class.php";
            //         break;
            //     default:
            //         include_once "./Entity/".$classe.".class.php";
            // }

        } catch (Exception $e){
            throw $e; // 404
        }
    });

?>