<template>
  <div id="app">
    <main>
      <div class="search-box">
        <input 
          type="text" class="search-bar" placeholder="Search..."
          v-model="query"
          @keypress.enter="fetchWeather"
        />
      </div>
      
      <div v-if="weather.forecast" class="weather-wrap">
        <div v-for="day in weather.forecast" :key="day.dt" class="forecast-box">
          <div class="details-container">
          <div class="date">{{ new Date(day.dt * 1000).toLocaleDateString() }}</div>
          <div class="weather">{{ day.weather[0].description }}</div>
          <div class="temp">{{ Math.round(day.main.temp) }} °C</div>
        </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      api_key: 'b6a0aec6e8bdc722d0d753f0b224c2da',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {}
    };
  },
  methods: {
    fetchWeather() {
      fetch(`${this.url_base}forecast?q=${this.query}&units=metric&APPID=${this.api_key}`)
        .then(res => res.json())
        .then(data => {
          this.weather = {
            forecast: this.extractFiveDayForecast(data)
          };
        })
        .catch(err => {
          console.error('Error fetching weather data:', err);
        });
    },
    extractFiveDayForecast(data) {
      const forecasts = data.list.filter(item => {
        // Selecting forecast data for 12:00 PM of each day
        return item.dt_txt.includes('12:00:00');
      });

      return forecasts.map(item => ({
        dt: item.dt,
        main: item.main,
        weather: item.weather
      }));
    }
  }
}
</script>
