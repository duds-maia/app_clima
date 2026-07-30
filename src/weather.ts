export type WeatherSummary = {
  city: string
  country: string
  temperature: number
  feelsLike: number
  humidity: number
  rain: number
  weatherCode: number
  weatherLabel: string
  windSpeed: number
  windDirection: number
  windDirectionLabel: string
  sunrise: string
  sunset: string
  period: 'day' | 'night'
  dateLabel: string
}

type GeoLocationResult = {
  name: string
  country: string
  latitude: number
  longitude: number
  timezone: string
}

type GeoResponse = {
  results?: GeoLocationResult[]
}

type ForecastResponse = {
  current?: {
    time?: string
    temperature_2m?: number
    relative_humidity_2m?: number
    apparent_temperature?: number
    rain?: number
    weather_code?: number
    wind_speed_10m?: number
    wind_direction_10m?: number
  }
  daily?: {
    sunrise?: string[]
    sunset?: string[]
  }
}

const weatherLabels: Record<number, string> = {
  0: 'Céu limpo',
  1: 'Predominantemente limpo',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Nevoeiro',
  48: 'Geada',
  51: 'Chuvisco leve',
  53: 'Chuvisco',
  55: 'Chuvisco forte',
  61: 'Chuva leve',
  63: 'Chuva',
  65: 'Chuva forte',
  71: 'Neve leve',
  73: 'Neve',
  75: 'Neve forte',
  77: 'Granizo',
  80: 'Pancadas de chuva',
  81: 'Chuva intensa',
  82: 'Chuva muito intensa',
  85: 'Neve leve',
  86: 'Neve forte',
  95: 'Trovoada',
  96: 'Trovoada com granizo',
  99: 'Trovoada severa',
}

export async function getWeatherForCity(city: string): Promise<WeatherSummary> {
  const geoUrl = new URL('https://geocoding-api.open-meteo.com/v1/search')
  geoUrl.searchParams.set('name', city)
  geoUrl.searchParams.set('count', '1')
  geoUrl.searchParams.set('language', 'pt')
  geoUrl.searchParams.set('format', 'json')

  const geoResponse = await fetch(geoUrl)
  if (!geoResponse.ok) {
    throw new Error('Não foi possível buscar a cidade informada.')
  }

  const geoData = (await geoResponse.json()) as GeoResponse
  const location = geoData.results?.[0]

  if (!location) {
    throw new Error('Cidade não encontrada. Tente outro nome.')
  }

  const forecastUrl = new URL('https://api.open-meteo.com/v1/forecast')
  forecastUrl.searchParams.set('latitude', String(location.latitude))
  forecastUrl.searchParams.set('longitude', String(location.longitude))
  forecastUrl.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,apparent_temperature,rain,weather_code,wind_speed_10m,wind_direction_10m',
  )
  forecastUrl.searchParams.set('daily', 'sunrise,sunset')
  forecastUrl.searchParams.set('timezone', location.timezone || 'auto')

  const forecastResponse = await fetch(forecastUrl)
  if (!forecastResponse.ok) {
    throw new Error('Não foi possível carregar os dados do clima.')
  }

  const forecastData = (await forecastResponse.json()) as ForecastResponse
  const current = forecastData.current

  if (!current) {
    throw new Error('Não há dados climáticos disponíveis para essa localização.')
  }

  const weatherCode = current.weather_code ?? 0
  const sunrise = forecastData.daily?.sunrise?.[0]
  const sunset = forecastData.daily?.sunset?.[0]
  const currentTime = current.time ?? new Date().toISOString()

  return {
    city: location.name,
    country: location.country,
    temperature: current.temperature_2m ?? 0,
    feelsLike: current.apparent_temperature ?? current.temperature_2m ?? 0,
    humidity: current.relative_humidity_2m ?? 0,
    rain: current.rain ?? 0,
    weatherCode,
    weatherLabel: weatherLabels[weatherCode] ?? 'Condição especial',
    windSpeed: current.wind_speed_10m ?? 0,
    windDirection: current.wind_direction_10m ?? 0,
    windDirectionLabel: getWindDirectionLabel(current.wind_direction_10m ?? 0),
    sunrise: sunrise ?? '',
    sunset: sunset ?? '',
    period: getDayPeriod(currentTime, sunrise, sunset),
    dateLabel: formatDateLabel(currentTime),
  }
}

function getWindDirectionLabel(degree: number): string {
  const directions = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO']
  const index = Math.round(degree / 45) % directions.length
  return directions[index]
}

function getDayPeriod(currentTime: string, sunrise?: string, sunset?: string): 'day' | 'night' {
  if (!sunrise || !sunset) {
    return 'day'
  }

  const now = new Date(currentTime)
  const sunriseDate = new Date(sunrise)
  const sunsetDate = new Date(sunset)

  return now >= sunriseDate && now < sunsetDate ? 'day' : 'night'
}

function formatDateLabel(value: string): string {
  const date = new Date(value)
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(date)
}

export function formatTime(value: string): string {
  if (!value) {
    return 'Não informado'
  }

  const date = new Date(value)
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
