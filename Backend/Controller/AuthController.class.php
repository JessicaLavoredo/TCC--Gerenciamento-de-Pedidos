<?php
    abstract class AuthController {

        static function validarToken(string $token) {
            
            $cabecalhoBase64Url = explode('.', $token)[0];
            $corpoBase64Url = explode('.', $token)[1];
            $assinaturaBase64Url = explode('.', $token)[2];

            $assinaturaValida = hash_hmac('sha256', $cabecalhoBase64Url.'.'.$corpoBase64Url, '733afb22eec7012734befbf478440aca', true);
            $assinaturaValidaBase64Url = Funcoes::base64UrlEncode($assinaturaValida);

            $corpo = json_decode(Funcoes::base64UrlDecode($corpoBase64Url));
            $dataExp = date_create($corpo->exp);
            $dataAgr = date_create();
            
            if ($assinaturaBase64Url === $assinaturaValidaBase64Url && $dataAgr < $dataExp) {
                return true;
            }

            return false;
        }

        static function gerarToken($idUsuario, $idPerfil){
            
            $header = [
                'alg' => 'HS256',
                'typ' => 'JWT'
            ];

            $payload = [
                'iss' => "Araponga-Backend",
                'iat' => date_format(New DateTime,"Y/m/d H:i:s"),
                'exp' => date_format((New DateTime)->add(date_interval_create_from_date_string('60 minutes')),"Y/m/d H:i:s"),
                'idUsuario' => $idUsuario,
                'idPerfil' => $idPerfil
            ];

            $cabecalhoBase64Url = Funcoes::base64UrlEncode(json_encode($header));
            $corpoBase64Url = Funcoes::base64UrlEncode(json_encode($payload));
            $assinatura = hash_hmac('sha256', $cabecalhoBase64Url.'.'.$corpoBase64Url, '733afb22eec7012734befbf478440aca', true);
            $assinaturaBase64Url = Funcoes::base64UrlEncode($assinatura);

            $token = $cabecalhoBase64Url.'.'.$corpoBase64Url.'.'.$assinaturaBase64Url;
            
            return $token;
        }
        
    }
?>