import './style.css'
import { getWeatherForCity } from './weather.ts'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App container not found')
}

app.innerHTML = `
  <main class="weather-app">
    <header class="search-bar">
      <form id="search-form">
        <input id="city-input" type="text" placeholder="Digite o nome da cidade" aria-label="Nome da cidade" />
        <button type="submit">Buscar</button>
      </form>
    </header>

    <section class="weather-shell" id="weather-shell">
      <div class="empty-state">
        <h1>Veja o clima da sua cidade</h1>
        <p>Pesquise por qualquer cidade e descubra as condições atuais do tempo.</p>
      </div>
    </section>
  </main>
`

const form = document.querySelector<HTMLFormElement>('#search-form')
const input = document.querySelector<HTMLInputElement>('#city-input')
const shell = document.querySelector<HTMLElement>('#weather-shell')

form?.addEventListener('submit', async (event) => {
  event.preventDefault()

  const city = input?.value.trim()
  if (!city) {
    renderError('Digite o nome de uma cidade para continuar.')
    return
  }

  renderLoading()

  try {
    const weather = await getWeatherForCity(city)
    renderWeather(weather)
  } catch (error) {
    renderError(error instanceof Error ? error.message : 'Não foi possível carregar o clima.')
  }
})

function renderLoading() {
  if (!shell) return
  shell.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Buscando informações do clima...</p>
    </div>
  `
}

function renderError(message: string) {
  if (!shell) return
  shell.innerHTML = `
    <div class="error-state">
      <h2>Não conseguimos carregar os dados</h2>
      <p>${message}</p>
    </div>
  `
}

function renderWeather(weather: Awaited<ReturnType<typeof getWeatherForCity>>) {
  if (!shell) return

  shell.innerHTML = `
    <div class="weather-card">
      <aside class="weather-sidebar">
        <div>
          <p class="eyebrow">${weather.dateLabel}</p>
          <h2>${weather.city}, ${weather.country}</h2>
          <p class="temperature">${weather.temperature.toFixed(0)}°C</p>
          <p class="period">${weather.period === 'day' ? 'Dia' : 'Noite'}</p>
        </div>
        <div class="sidebar-footer">
          <p>${weather.weatherLabel}</p>
          <span>${weather.weatherCode}</span>
        </div>
      </aside>

      <section class="weather-main">
        <div class="main-grid">
          <article class="metric-card">
            <h3>Umidade</h3>
            <p>${weather.humidity}%</p>
          </article>
          <article class="metric-card">
            <h3>Sensação térmica</h3>
            <p>${weather.feelsLike.toFixed(0)}°C</p>
          </article>
          <article class="metric-card">
            <h3>Precipitação</h3>
            <p>${weather.rain.toFixed(1)} mm</p>
          </article>
          <article class="metric-card">
            <h3>Vento</h3>
            <p>${weather.windSpeed.toFixed(0)} km/h · ${weather.windDirection.toFixed(0)}°</p>
          </article>
        </div>
      </section>
    </div>
  `
}
