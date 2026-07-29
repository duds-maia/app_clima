# projeto clima

esse projeto vai pegar a cidade e baseada nisso consultar o clima daquela regiao exibindo as principais informacoes de lima,temperatira, umidade etc...

### aspectos tecnicos

o projeto vai ser feito em VITE + VANILLA + TS 

ele vai usar a api openmeteo, com os seguintes end points

Para pegar as informações do clima
https://geocoding-api.open-meteo.com/v1/search?name={NOME DA CIDADE}&count=1&language=pt&format=json

{NOME DA CIDADE} =  nome da cidade que o usuario digitou
Exemplo de resposta:
{
  "results": [
    {
      "id": 3451190,
      "name": "Rio de Janeiro",
      "latitude": -22.90642,
      "longitude": -43.18223,
      "elevation": 12,
      "feature_code": "PPLA",
      "country_code": "BR",
      "admin1_id": 3451189,
      "admin2_id": 6322060,
      "timezone": "America/Sao_Paulo",
      "population": 6747815,
      "country_id": 3469034,
      "country": "Brasil",
      "admin1": "Rio de Janeiro",
      "admin2": "Rio de Janeiro"
    }
  ],
  "generationtime_ms": 1.7914772
}

Informações que precisamos:
-name
-latitude
-longitude
-timezone

Para pegar e latitude, longitude e timezone, baseado no nome da cidade:
https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={LONGITUDE}&daily=sunrise,sunset&hourly=temperature_2m&current=rain,precipitation,temperature_2m,weather_code

{LATITUDE}
{LONGITUDE}

Exemplo de resposta 

{
  "latitude": -22.952549,
  "longitude": -43.215027,
  "generationtime_ms": 0.334858894348145,
  "utc_offset_seconds": 0,
  "timezone": "GMT",
  "timezone_abbreviation": "GMT",
  "elevation": 12,
  "current_units": {
    "time": "iso8601",
    "interval": "seconds",
    "weather_code": "wmo code",
    "temperature_2m": "°C",
    "relative_humidity_2m": "%",
    "apparent_temperature": "°C",
    "rain": "mm"
  },
  "current": {
    "time": "2026-07-28T23:15",
    "interval": 900,
    "weather_code": 0,
    "temperature_2m": 22.8,
    "relative_humidity_2m": 75,
    "apparent_temperature": 24.9,
    "rain": 0
  }
}

Informações que precisamos da resposta
Na resposta eu tenho 2 itens
-current_units tem as unidades de medida das propriedades
-current tem os calores da propriedades

Propriedades obrigatorias
-time
-weather_code
-emperatire_2m
-relative_humidity_2m
-apparent_temperature
-rain

####  Informação importante
Teremos um arquivo com as informações do openmetepo para que o preojeto nao faça requisoçao direta a API mas sim use as funcoes desse arquivo

Fluxo de pesquisa para recever o nome da cidade e pefar as informaçoes  de clima
- o ususario digita o nome da cidade 
- o prejeto pega o nome e usa na Openmeteo para pegar a latitude e longitude dessa cidade
- ao pegar a latitude e longitude o projeto usa essas informações oara fazer a requisição e pegar as informaçoes do clima dessa localização
- caso nao ache as informações da cidade se comportar como se nao tivesse achado nada, caso ache as informações da cidade e nao a de clima, se comportar como se nao tivesse achado nada

A busca envolve as 2 requisiçoe, buscar latitude e longitude, mas par ao usuario é uma só

AAs funçoes do openmeteo se o parametros vieram, age como se nao tivesse vindo

### Aspectos visuais 

Tem que ter Empty State

teremos uma area superior centralizada que tem apenas o campo de busca da cidade

o projeto tera um sidebar na esquerda com as seguintes informações
-temperatura
-nome da cidade
-dia atual
-se é dia ou noite
-weather code(informações de interpretação do clima)

Na area principal
-umidade relativa
-temperatura aperente
-probabilidade de precipitação
-velocidade/direção do vento

desing geral:
- o projeto tera um fundo cinza escuro
- a parte superior nao tera background, mas tanto a sidebar quanto a area principal ficarao dentro de uma div comm borda bem arredondada, fundo branco, centralizada e largura maxima de 800px 