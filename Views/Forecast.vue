<template>
  <div id="app2">
    <main>
      <link rel="stylesheet" href="/main.css">
      <!-- Search box -->
      <div class="search-box">
        <input 
          type="text" class="search-bar" placeholder="Search..."
          id="cityQuery"
          @keypress.enter="searchWeatherByCity"
        />
      </div>
      <!-- Current location -->
      <div class="current-location">
        <p>Your current location is: {{ city }} in {{ region }}, {{ country }}.</p>
      </div> 
      
      <div class="weather-details">
        
        <button id="change-unit" @click="toggleTemperatureUnit">Toggle Unit</button>
      </div>

      <div class="login-button">
        <button id="login-button" @click="redictToLoginPage ">Login</button>

      </div>
      
      
      <!-- Forecast -->
      {{ console.log('filter', fiveDayForecast) }}
      <div v-if="fiveDayForecast" class="forecast-box">
        <div v-for="day in fiveDayForecast" :key="day.dt" class="details-container">
  <div class="date">{{ new Date(day.dt * 1000).toLocaleDateString() }}</div>
  <div class="weather">{{ day.weather[0].description }}</div>
  <div class="temp">{{ convertTemperature(day.main.temp) }} {{ temperatureUnit }}</div>
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
      query: {},
      api_key: '97cc0dc7f48e4ba3a50563b6bf5bea06',
      city: '',
      region: '',
      country: '',
      weather: {},
      fiveDayForecast: {},
      API_URL: `https://ipgeolocation.abstractapi.com/v1/?api_key=97cc0dc7f48e4ba3a50563b6bf5bea06`,
      latitude: '',
      longitude: '',
      temperature: '',
      temperatureUnit: '°C', // Initial temperature unit
    };
  },
  mounted() {
    this.getGeolocation();
    this.startBackgroundSlideshow();
  },
  
  methods: {
  
    async getGeolocation() {
      try {
        
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition( position => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.fetchWeather(this.latitude, this.longitude);
            this.getFiveDayForecast();
          });
          this.city = 'Sarajevo'
          this.region = 'BiH'
          this.country = 'Bosnia&Herzegovina'
          } else {
          throw new Error('Failed to fetch geolocation data');
        }
      } catch (error) {
        console.log('Error getting geolocation:', error);
        throw error;
      }
    },

    /*async signup({ commit }, payload) {
    commit('setLoading', true);
    await fb.auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseData => {
        fb.usersCollection.doc(firebaseData.user.uid).set({
          nickname: payload.nickname,
          name: payload.name,
          email: payload.email,
          enable: false // <= this from true to false
        })
          .then(_ => {*/

    async fetchWeather(latitude, longitude) {
      const API_KEY = 'dcf0aa7bee48722b04be22c49ef54dfa';
      const API_URL_W = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=hr`;

      try {
        const responseW = await fetch(API_URL_W);
        const dataW = await responseW.json();
        this.weather = dataW;
        this.updateTemperature(dataW.main.temp); // Update temperature
        
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    },

async getFiveDayForecast() {
  const API_KEY = 'dcf0aa7bee48722b04be22c49ef54dfa';
  const API_URL_FiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.latitude}&lon=${this.longitude}&appid=${API_KEY}&lang=hr`;

  try {
    const response = await fetch(API_URL_FiveDay);
    const data = await response.json();

    // Filter the forecast data for 12:00:00 of each day
    const filteredForecast = data.list.filter(forecast => forecast.dt_txt.includes(' 12:00:00'));

    // Assign the filtered forecast data to this.fiveDayForecast
    this.fiveDayForecast = filteredForecast;
    
    console.log('Filtered forecast:', this.fiveDayForecast);
  } catch (error) {
    console.error('Failed to fetch five-day forecast data:', error);
  }
}
,

    // Method to toggle temperature unit
    toggleTemperatureUnit() {
      this.temperatureUnit = this.temperatureUnit === '°C' ? '°F' : '°C';
      // Update temperature with current unit
      this.updateTemperature(this.weather.main.temp);
    },

    // Method to update temperature based on unit
    updateTemperature(tempKelvin) {
      if (this.temperatureUnit === '°C') {
        // Convert temperature from Kelvin to Celsius
        this.temperature = Math.round(tempKelvin - 273.15);
      } else {
        // Convert temperature from Kelvin to Fahrenheit
        this.temperature = Math.round((tempKelvin - 273.15) * 9/5 + 32);
      }
    },

    // Method to convert temperature based on unit
    convertTemperature(tempKelvin) {
      if (this.temperatureUnit === '°C') {
        // Convert temperature from Kelvin to Celsius
        return Math.round(tempKelvin - 273.15);
      } else {
        // Convert temperature from Kelvin to Fahrenheit
        return Math.round((tempKelvin - 273.15) * 9/5 + 32);
      }
    },
    async searchWeatherByCity() {
      try {
        this.errorMessage =''
        const inputElement = document.getElementById('cityQuery');
        const cityQuery = encodeURIComponent(inputElement.value.trim());
         console.log(cityQuery);
         const API_KEY = 'dcf0aa7bee48722b04be22c49ef54dfa';
        const API_URL_City = `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${API_KEY}&lang=hr`;

        const response= await fetch(API_URL_City);
        console.log('API response:', response);
        console.log('API status:', response.status);
        const data = await response.json();
        console.log('API data:', data)

        if(data.cod === 200) {
          this.city = data.name;
          this.country = data.sys.country;
          this.latitude = data.coord.lat;
          this.longitude = data.coord.lon;
          this.fetchWeather(this.latitude, this.longitude)
          console.log(this.fetchWeather)
          this.getFiveDayForecast()
        }else {
          throw new Error ('City not found');
        }
      }catch (error) {
        console.log('Error searching weather by city', error)
        this.errorMessage = 'City not found. Please try again.';
        alert('City not found. Please try again.')
      }
    },
   async redictToLoginPage () {
    window.location.href = "/login";
   },
       // Start background slideshow
       startBackgroundSlideshow() {
      const images = ['./Views/switzerland-8056381-min-min.jpg', './Views/forsythia-8638586-min-min.jpg', './Views/buildings-5528981-min-min.jpg' ];
      let currentImageIndex = 0;

      setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const appElement = document.getElementById('app2');
    appElement.style.backgroundImage = `url('${images[currentImageIndex]}')`;

}, 4000);



    }
  }
};
</script>
