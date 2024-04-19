<template>
  <div id="app">
    <main>
      <div class="search-box">
        <input 
          type="text" class="search-bar" placeholder="Search..."
          v-model="query"
        />
        {{ query }}
      </div>
      
      <div class="weather-wrap">
        <div class="location-box">
          <div class="location">Sarajevo, BiH</div>
          <div class="date">17 April 2024 </div>
        </div>
      </div>

      <div class="weather-box">
        <div class="temp">10°C</div>
        <div class="weather">Kišovito</div>
      </div>
    </main>
  </div>
</template>

<style>
 /* @import '/main.css';*/
</style>

<script>
export default {
  name: 'app',
  data() {
    return {
      api_key: 'b0fbe4aff43d7f282e2c196d21722a79',
      url_base: 'https://home.openweathermap.org/',
      query: ''
    };
  },
  mounted() {
    this.callWeatherAPI();
  },
  methods: {
    callWeatherAPI() {
      const apiUrl = `${this.url_base}?apikey=${this.api_key}&query=${this.query}`;
      console.log('API URL:', apiUrl);
      
      // Ovdje uradi Axios ili Fetch request dalje, to istraži malo
    }
  }
};
</script>

