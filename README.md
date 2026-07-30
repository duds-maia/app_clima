# App Clima

Aplicação web em TypeScript + Vite para consultar o clima de uma cidade em tempo real usando a API pública do Open-Meteo.

## ✨ Funcionalidades

- Busca de clima por nome de cidade
- Exibição de temperatura, umidade, sensação térmica e precipitação
- Informações de vento, nascer/pôr do sol e período do dia
- Interface responsiva e simples

## 🛠️ Tecnologias

- TypeScript
- Vite
- CSS moderno
- Open-Meteo Geocoding + Forecast API

## ▶️ Como executar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra o endereço exibido no terminal no seu navegador.

## 🔧 Como buildar o projeto

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos prontos para publicação serão gerados na pasta `dist/`.

## 🚀 Deploy no GitHub Pages

Este projeto já está preparado para deploy no GitHub Pages via GitHub Actions.

### Passos

1. Garanta que a branch principal do repositório seja `master`.
2. O workflow de CI/CD irá:
   - instalar dependências
   - gerar a build do Vite
   - publicar os arquivos da pasta `dist/` no GitHub Pages

## 📁 Estrutura principal

```text
src/
  main.ts        # lógica da interface e renderização
  weather.ts     # integração com a API do clima
  style.css      # estilos da aplicação
```

## 📄 Licença

Este projeto é de uso livre para fins educacionais e de demonstração.
