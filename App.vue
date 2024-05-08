<template>

  <router-view/>

</template>

<script>
import {onBeforeMount} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {getAuth} from 'firebase/auth';




  export default{
    setup () {
      const router = useRouter();
      const route = useRoute();

      onBeforeMount (() => {
        getAuth().onAuthStateChanged((user) =>{
          /*if (!user) {
            router.replace('/login')
          } else (route.path == "/login", route.path == "/register") ; {
            router.replace('/login')
            
          } */
        })
        })
      }
    }

  
</script>