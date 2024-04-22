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
      
      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'"> 
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date">{{ new Date(weather.dt * 1000).toLocaleDateString() }}</div>
        </div>
        <div class="weather-box">
          <div class="temp">{{ Math.round (weather.main.temp) }} °C</div>
          <div class="weather">{{ weather.weather[0].description }}</div>
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
      fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
        .then(res => res.json())
        .then(data => {
          this.weather = data;
        })
        .catch(err => {
          console.error('Error fetching weather data:', err);
        });
    }
  }
}
</script>
