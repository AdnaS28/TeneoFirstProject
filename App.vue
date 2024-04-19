<template>
 <head>
    <div id="app">
    </div>
  </head>     
    <main>
         <div class="search-box">
        <input 
        type="text" class="search-bar" placeholder="Search..."
        v-model:"query"
        />
        {{query}}
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
</template>

     
<style>
  @import ' ./src/assets/main.css ';
</style>

<script>
export deafult{
  name: 'app',
  Vue.createApp ({
  data() {
    return {
      api_key: 'b0fbe4aff43d7f282e2c196d21722a79'
      url_base: 'https://home.openweathermap.org/'

    }
  }
  })
}


</script>
