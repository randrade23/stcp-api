# stcp-api [![Build Status](https://travis-ci.org/randrade23/stcp-api.svg?branch=master)](https://travis-ci.org/randrade23/stcp-api)

Implementação de uma API REST que abstrai a API privada da STCP/Itinerarium.net.

Não oficial.

Escrito em Node.js com Express. Pronto para deployment para AWS Lambda (com Serverless), ou pode ser utilizada [aqui](https://u0og7d9x62.execute-api.us-east-1.amazonaws.com/prod/).

## Lista de linhas

### Request

`GET /buses`

    curl -X GET http://localhost:8080/buses

### Response

    HTTP/1.1 200 OK
    Date: Thu, 17 Feb 2020 21:00:00 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{"accessibility":1,"code":"200","pubcode":"200","description":"200 - BOLHÃO-CAST. QUEIJO"},{"accessibility":2,"code":"201","pubcode":"201","description":"201 - ALIADOS-VISO"},{"accessibility":2,"code":"202","pubcode":"202","description":"202 - ALIADOS-PASSEIO ALEGRE (VIA AV. BESSA)"},{"accessibility":2,"code":"203","pubcode":"203","description":"203 - MARQUÊS - CAST.QUEIJO"},{"accessibility":1,"code":"204","pubcode":"204","description":"204 - HOSPITAL DE S.JOÃO - FOZ"},{"accessibility":1,"code":"205","pubcode":"205","description":"205 - CAMPANHÃ-CASTELO DO QUEIJO"}, ...]

## Lista de sentidos por linha

### Request

`GET /directions/:bus`

    curl -X GET http://localhost:8080/directions/506

### Response

    HTTP/1.1 200 OK
    Date: Thu, 17 Feb 2020 21:00:00 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{"descr_dir":"HOSPITAL S.JOÃO-MATOSINHOS (MERCADO)","descr":"506 MATOSINHOS (MERCADO)","dir":0},{"descr_dir":"MATOSINHOS (MERCADO)-HOSPITAL S.JOÃO","descr":"506 HOSPITAL S.JOÃO","dir":1}]

## Lista de paragens por linha e por sentido

### Request

`GET /stops/:bus/:direction`

    curl -X GET http://localhost:8080/stops/506/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 17 Feb 2020 21:00:00 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{"zone":"MTS1","code":"MATM1","name":"MATOSINHOS MERCADO","address":"AV.ENG.DUARTE PACHECO","sequence":1},{"zone":"MTS1","code":"SP5","name":"S. PEDRO","address":"R.ROBERTO IVENS","sequence":2},{"zone":"MTS1","code":"PDZ3","name":"1º DE DEZEMBRO","address":"R.ROBERTO IVENS","sequence":3},{"zone":"MTS1","code":"BRTC2","name":"BRITO CAPELO","address":"R.TOMÁS RIBEIRO","sequence":4},{"zone":"MTS1","code":"PQBT4","name":"PQ BASÍLIO TELES","address":"R.TOMÁS RIBEIRO","sequence":5}, ...]

## Lista de paragens por linha, em qualquer sentido

### Request

`GET /stops/:bus`

    curl -X GET http://localhost:8080/stops/506

### Response

    HTTP/1.1 200 OK
    Date: Thu, 17 Feb 2020 21:00:00 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{"direction":0,"stopsList":[{"zone":"PRT3","code":"HSJ4","name":"HOSP. S. JOÃO (METRO)","address":"ALAM.HERNÂNI MONTEIRO","sequence":1},{"zone":"MAI1","code":"RCA","name":"RICARDO ALVES","address":"R.ARROTEIA","sequence":2},{"zone":"MAI1","code":"FEL1","name":"FELICIANA","address":"R.ARROTEIA","sequence":3},{"zone":"MAI1","code":"CVD1","name":"CAVADAS","address":"R.PADRE COSTA","sequence":4},{"zone":"MAI1","code":"ISCP1","name":"ISCAP","address":"R.PADRE COSTA","sequence":5}, ...]},{"direction":1,"stopsList":[{"zone":"MTS1","code":"MATM1","name":"MATOSINHOS MERCADO","address":"AV.ENG.DUARTE PACHECO","sequence":1},{"zone":"MTS1","code":"SP5","name":"S. PEDRO","address":"R.ROBERTO IVENS","sequence":2},{"zone":"MTS1","code":"PDZ3","name":"1º DE DEZEMBRO","address":"R.ROBERTO IVENS","sequence":3},{"zone":"MTS1","code":"BRTC2","name":"BRITO CAPELO","address":"R.TOMÁS RIBEIRO","sequence":4},{"zone":"MTS1","code":"PQBT4","name":"PQ BASÍLIO TELES","address":"R.TOMÁS RIBEIRO","sequence":5}, ...]}]

## Informação sobre uma paragem

### Request

`GET /stop/:code`

    curl -X GET http://localhost:8080/stop/TRD1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 17 Feb 2020 21:00:00 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{"code":"TRD1","name":"TRINDADE","zone":"PRT1","lines":[{"accessibility":1,"code":"200","pubcode":"200","dir":1,"description":"BOLHÃO"},{"accessibility":2,"code":"202","pubcode":"202","dir":0,"description":"PASSEIO ALEGRE (VIA AV. BESSA)"},{"accessibility":1,"code":"600","pubcode":"600","dir":0,"description":"MAIA(BARCA)"},{"accessibility":1,"code":"703","pubcode":"703","dir":0,"description":"SONHOS"},{"accessibility":2,"code":"4M","pubcode":"4M","dir":0,"description":"MAIA (CÂMARA)"},{"accessibility":2,"code":"11M","pubcode":"11M","dir":1,"description":"HOSP. S. JOÃO"}],"geomdesc":"{\"type\":\"Point\",\"coordinates\":[-8.609555606679713,41.151798699855078]}","mode":1,"address":"R.TRINDADE"}]
    