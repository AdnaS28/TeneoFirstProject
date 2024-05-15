<template>
    <body id="body-register">
    <link rel="stylesheet" href="/main.css">
    
      
        <form class="Form2"@submit.prevent='Register'>
            <h1 class="login-title">Register</h1>
            <div id="inputs">
            <div class="col-md-6 col-lg-4"></div>
            <input id="email-field" type="text" placeholder="Email" v-model="email"/></br>
            <input id="password-field" type="password" placeholder="Password" v-model="password" /></br>

            <div id="sixth-button">
            <input id="fifth-button" type="submit" value="Register" />
        </div>
         <div id="login-query">
        <p class="log"> Already have an account ? <router-link to="/login">Login Here</router-link></p><br>
         </div>
        </div>
        </form>
  
  
    </body>
</template>

<script>
 import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
 import "firebase/auth";
 import {ref} from 'vue';

// Get the Auth instance
const auth = getAuth();
export default {
    setup() {
        const email = ref("")
        const password = ref("")

        const Register = () => {
            console.log(auth)
            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then(user => {
                    alert(user);
                })
                .catch('greška');
        }

        return{
         Register,
         email,
         password}
    }
    

}


</script>