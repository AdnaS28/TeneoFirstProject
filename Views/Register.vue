<template>
    <link rel="stylesheet" href="/main.css">
    <div class="register">
        <h1>Register</h1>
        <form @submit.prevent='Register'>
            <input type="text" placeholder="Email" v-model="email"/>
            <input type="password" placeholder="Password" v-model="password" />
            <input type="submit" value="Register" />
        </form>
    </div>
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