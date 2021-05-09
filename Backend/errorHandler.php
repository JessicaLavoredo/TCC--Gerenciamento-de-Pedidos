<?php

    // Código retirado do site abaixo:
    // https://stackoverflow.com/questions/277224/how-do-i-catch-a-php-fatal-e-error-error

    define('E_FATAL',  E_ERROR | E_USER_ERROR | E_PARSE | E_CORE_ERROR |
            E_COMPILE_ERROR | E_RECOVERABLE_ERROR);
    define('ENV', 'production');
    
    // Custom error handling vars
    define('DISPLAY_ERRORS', FALSE);
    define('ERROR_REPORTING', E_ALL | E_STRICT);
    define('LOG_ERRORS', TRUE);
    
    register_shutdown_function('shut');

    set_error_handler('eHandler');

    // Function to catch no user error handler function errors...
    function shut(){

        $error = error_get_last();

        if($error && ($error['type'] & E_FATAL)){
            eHandler($error['type'], $error['message'], $error['file'], $error['line']);
        }

    }

    function eHandler( $errno, $errstr, $errfile, $errline ) {

        switch ($errno){

            case E_ERROR: // 1 //
                $typestr = 'E_ERROR'; break;
            case E_WARNING: // 2 //
                $typestr = 'E_WARNING'; break;
            case E_PARSE: // 4 //
                $typestr = 'E_PARSE'; break;
            case E_NOTICE: // 8 //
                $typestr = 'E_NOTICE'; break;
            case E_CORE_ERROR: // 16 //
                $typestr = 'E_CORE_ERROR'; break;
            case E_CORE_WARNING: // 32 //
                $typestr = 'E_CORE_WARNING'; break;
            case E_COMPILE_ERROR: // 64 //
                $typestr = 'E_COMPILE_ERROR'; break;
            case E_CORE_WARNING: // 128 //
                $typestr = 'E_COMPILE_WARNING'; break;
            case E_USER_ERROR: // 256 //
                $typestr = 'E_USER_ERROR'; break;
            case E_USER_WARNING: // 512 //
                $typestr = 'E_USER_WARNING'; break;
            case E_USER_NOTICE: // 1024 //
                $typestr = 'E_USER_NOTICE'; break;
            case E_STRICT: // 2048 //
                $typestr = 'E_STRICT'; break;
            case E_RECOVERABLE_ERROR: // 4096 //
                $typestr = 'E_RECOVERABLE_ERROR'; break;
            case E_DEPRECATED: // 8192 //
                $typestr = 'E_DEPRECATED'; break;
            case E_USER_DEPRECATED: // 16384 //
                $typestr = 'E_USER_DEPRECATED'; break;
        }

        $message = $typestr . ': ' . $errstr .' in ' . $errfile . ' on line ' . $errline;

        // if(($errno & E_FATAL) && ENV === 'production'){
            // header('Status: 500 Internal Server Error');
        // }

        if(!($errno & ERROR_REPORTING))
            return;

        //Logging error on php file error log...
        if(LOG_ERRORS)
            error_log(strip_tags($message), 0);

        throw New Exception($message);
    }

    // ob_start();

    
?>