<template>
<body id="body-login">
        <link rel="stylesheet" href="/main.css">
    
       

        <form class="Form2"@submit.prevent='Login'>
            <h1 class="login-title"> Sign In</h1><br>
            <div id="inputs">
            <div class="col-md-6 col-lg-4">
                
                <input id="email-field" type="text" placeholder="Email" v-model="email"/><br>
                <input id="password-field" type="password" placeholder="Password" v-model="password" /><br>
            </div>
        </div>
            <div id="third-button">
                <input id="another-button"  type="submit" value="Login" />
            </div>
          <div id="registration"> 
        <p class="reg"> Need an account ? <router-link to="/register">Register here</router-link></p><br>
    </div>  
        <p class="password-query">Forgot password?   Request an SMS code</p>
    
            
        </form>
    

   
    <div v-if="invalidLogin" class="popup">
            <div class="popup-content">
            Invalid email or password.
            <button @click="dismissPopup">OK</button>
            </div>
        </div> 
    
    </body>   
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


/*css for login
.login-box{
  border-top: black;
  border: 10px;
  justify-content: center;
}
.login-title{
    font-family: Arial, Helvetica, sans-serif
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
  z-index: 1000;
}*/

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;

}

.popup button {
  margin-top: 10px;
}









