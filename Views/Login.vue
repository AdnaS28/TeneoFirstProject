<template>
    <link rel="stylesheet" href="/main.css">
    <main class="login-head">
    <div class="login">
        <h1 class="login-title">Login</h1>
        <form @submit.prevent='Login'>
            <input type="text" placeholder="Email" v-model="email"/>
            <input type="password" placeholder="Password" v-model="password" />
            <input type="submit" value="Login" />
            
            <p class="register"> Need an account ? <router-link to="/register">Register here</router-link></p>
        </form>
    
        
    </div>
</main>    
    <div v-if="invalidLogin" class="popup">
            <div class="popup-content">
            Invalid email or password.
            <button @click="dismissPopup">OK</button>
            </div>
        </div> 
    
    
</template>

<script>
import {ref} from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const auth = getAuth();
export default{
    setup() {
        const email = ref("")
        const password = ref("")
        const invalidLogin = ref(false)
        
        const Login = () => {
            console.log('test', password.value)
            console.log(auth)
            signInWithEmailAndPassword (auth, email.value, password.value)
            .then((userCredential) => {
                    // Login successful
                    const user = userCredential.user;
                    console.log("Login successful:", user);
                    // Redirect or perform other actions
                    window.location.href = '/';
                })
                .catch((error) => {
                    const errorMessage = 'Wrong password'
                    console.log(error.code)
                    // Check if error is due to wrong password
                    if (error.code === 'auth/wrong-password', errorMessage) {
                        invalidLogin.value = true; // Set invalidLogin to true to show error message
                    }
                });
               
        }
        const dismissPopup = () => {
            invalidLogin.value = false; // Dismiss the pop-up
        }
        return{
            Login,
            dismissPopup,
            email,
            password,
            invalidLogin,
            city: '',
            region: '',
            country:' '
            
        }
    }, 
    
    }

</script>