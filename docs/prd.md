# PRD — Aplicativo de Clima

## 1. Visão Geral

O objetivo deste projeto é fornecer uma experiência simples e rápida para consultar o clima de uma cidade informada pelo usuário. A aplicação deve buscar as informações meteorológicas via API externa, processar os dados e exibir um resumo visual claro, organizado e responsivo.

O produto é uma aplicação web simples, construída com Vite, TypeScript e JavaScript vanilla, sem framework de UI.

## 2. Objetivo do Produto

Permitir que um usuário:
- informe o nome de uma cidade;
- receba as principais informações climáticas dessa localização;
- visualize um estado de carregamento e um estado vazio quando não houver dados;
- tenha uma interface limpa e centralizada, com destaque para os dados mais relevantes.

## 3. Público-Alvo

Usuários que desejam:
- consultar rapidamente o clima de uma cidade;
- ter uma interface simples, sem necessidade de cadastro ou autenticação;
- acessar informações básicas do clima em um único lugar.

## 4. Funcionalidades Principais

### 4.1 Busca de cidade
- O usuário digita o nome de uma cidade em um campo de busca.
- Ao confirmar a busca, o sistema consulta a API de geocodificação para encontrar a cidade.
- Se a cidade for localizada, o sistema usa as coordenadas retornadas para buscar as informações climáticas.

### 4.2 Exibição de dados climáticos
A interface deve exibir, no mínimo, os seguintes dados:
- temperatura atual;
- sensação térmica;
- umidade relativa;
- precipitação/chuva;
- nome da cidade;
- dia atual;
- indicação de dia/noite;
- descrição interpretável do clima com base no weather code.

### 4.3 Estados da interface
- Estado inicial: a interface aparece vazia ou com um estado de boas-vindas, indicando que a busca ainda não foi realizada.
- Estado de carregamento: durante a busca, a interface mostra feedback visual de carregamento.
- Estado vazio/erro: se a cidade não for encontrada ou se a API falhar, o sistema exibe uma mensagem amigável informando que não foi possível carregar os dados.

### 4.4 Experiência de uso
- A busca deve ser percebida como uma única ação para o usuário, mesmo sendo executada em duas etapas internas (geocodificação e previsão).
- O fluxo deve ser simples e direto, com foco na leitura rápida dos dados.

## 5. Requisitos Funcionais

### 5.1 Busca
- O sistema deve aceitar um texto de cidade informado pelo usuário.
- O sistema deve realizar a busca automaticamente ao confirmar a ação de pesquisa.
- O sistema deve tratar entradas vazias ou inválidas como erro de validação.
- O sistema deve mostrar feedback claro em caso de falha na busca.

### 5.2 Integração com API
- O sistema deve utilizar uma camada de serviço dedicada para acessar a API externa.
- O sistema deve separar o fluxo de geocodificação do fluxo de consulta de previsão.
- O sistema deve tratar falhas de rede, respostas vazias ou dados incompletos.

### 5.3 Exibição de dados
- O sistema deve exibir os dados principais em um layout organizado.
- O sistema deve formatar e apresentar as informações de forma legível.
- O sistema deve exibir um resumo do clima com base no weather code.

### 5.4 Tratamento de erros
- Se a cidade não for encontrada, exibir mensagem de “cidade não encontrada”.
- Se a API retornar dados incompletos, exibir mensagem de erro amigável.
- Se houver falha na conexão, mostrar estado de erro sem quebrar a interface.

## 6. Requisitos de Sistema

### 6.1 Tecnologias
- Vite como ferramenta de build e desenvolvimento.
- TypeScript para tipagem e organização do código.
- CSS puro para estilização.
- JavaScript vanilla para manipulação do DOM.

### 6.2 Integração externa
- A aplicação deve consumir a API Open-Meteo.
- O projeto deve evitar consultas diretas ao código da interface, encapsulando chamadas em módulos específicos.
- O acesso à API deve ser tratado em uma camada isolada para facilitar manutenção e testes futuros.

### 6.3 Estrutura esperada do projeto
- Arquivo principal de inicialização da interface.
- Arquivo de estilos.
- Módulo dedicado para consumo da API.
- Módulo dedicado para transformação e interpretação dos dados.

### 6.4 Requisitos de qualidade
- O código deve ser organizado e legível.
- O fluxo de busca deve ser simples e previsível.
- A interface deve funcionar sem depender de bibliotecas pesadas.

## 7. Detalhes Técnicos

### 7.1 API de geocodificação
A aplicação deve consumir o endpoint de busca de cidade:
- endpoint: https://geocoding-api.open-meteo.com/v1/search
- parâmetros: nome da cidade, limite de resultados, idioma, formato JSON.

Dados esperados para uso:
- name
- latitude
- longitude
- timezone
- country

### 7.2 API de previsão
A aplicação deve consumir o endpoint de previsão com base nas coordenadas retornadas:
- endpoint: https://api.open-meteo.com/v1/forecast
- parâmetros: latitude, longitude, dados desejados como temperatura, umidade, chuva e weather code.

Dados esperados para uso:
- current.time
- current.weather_code
- current.temperature_2m
- current.relative_humidity_2m
- current.apparent_temperature
- current.rain

### 7.3 Camada de serviço
Recomenda-se criar um módulo responsável por:
- montar as URLs;
- executar fetch;
- tratar erros de rede;
- normalizar os dados recebidos.

### 7.4 Tratamento de dados
- O projeto deve considerar que a API pode retornar dados faltantes ou nulos.
- Em caso de ausência de valores, o sistema deve exibir “Não informado” ou um valor padrão seguro.
- O sistema deve proteger o fluxo principal contra respostas inesperadas.

### 7.5 Mapping de weather code
Para melhorar a experiência visual, o sistema pode traduzir o weather code em uma descrição legível, como:
- 0: céu limpo
- 1-3: parcialmente nublado
- 45-48: neblina
- 51-67: chuva leve
- 71-77: neve
- 80-82: pancadas de chuva
- 95-99: tempestade

Essa tradução pode ser implementada como função auxiliar em um módulo separado.

## 8. Regras de UX e Interface

### 8.1 Layout geral
- Fundo escuro na página inteira.
- A área principal deve ficar centralizada horizontalmente.
- O conteúdo principal deve estar contido em uma caixa arredondada, com borda suave e fundo claro.
- A largura máxima da área principal deve ser próxima de 800px.

### 8.2 Estrutura visual recomendada
- Topo: campo de busca centralizado.
- Coluna lateral esquerda: resumo do clima com dados principais.
- Área principal direita: detalhes e métricas complementares.

### 8.3 Instruções visuais
- A interface deve parecer limpa, moderna e minimalista.
- O contraste entre fundo escuro e painel claro deve guiar o olhar para o conteúdo principal.
- Os cards ou blocos de informação devem ter espaçamento consistente.
- A tipografia deve ser legível e com peso adequado para destacar dados principais.
- A experiência visual deve ser confortável em telas pequenas e médias.

### 8.4 Estados visuais
- Empty state: exibir uma mensagem de orientação, indicando que o usuário ainda não realizou uma busca.
- Loading state: exibir um indicador de carregamento simples, sem travar a tela.
- Error state: exibir mensagem clara e visualmente destacada.

## 9. Critérios de Aceitação

A implementação será considerada completa quando:
- o usuário consegue buscar uma cidade;
- o sistema mostra as informações principais do clima;
- a interface trata corretamente casos de erro e ausência de dados;
- a experiência visual segue o conceito de painel centralizado com fundo escuro e área clara;
- o fluxo de busca funciona sem quebra de layout ou erros inesperados.

## 10. Premissas e Decisões Pendentes

As decisões abaixo podem ser ajustadas conforme a preferência do time:
- definir se a descrição do clima será exibida em texto simples ou com ícone associado;
- definir se a aplicação deve mostrar também a velocidade e direção do vento;
- definir se o estado de carregamento será um spinner simples ou uma skeleton;
- definir se a aplicação deverá exibir horário local da cidade ou horário do usuário.

## 11. Observação Técnica

Este PRD assume que a implementação usará a API Open-Meteo de forma indireta, com um módulo dedicado para encapsular as requisições e manter o código organizado. Essa abordagem facilita futuras expansões, como adicionar mais dados meteorológicos ou trocar a fonte de dados sem impactar a interface.
