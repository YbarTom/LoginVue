<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4 class="mx-auto text-center" style="max-width: 400px; width: 100%;">
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>
                            {{ stateObj.login.name }} form
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <form ref="form" @submit.prevent="login()">
                            <v-text-field v-model="username" name="username" label="Username" type="text"
                                placeholder="username" required></v-text-field>

                            <v-text-field v-model="password" name="password" label="Password" type="password"
                                placeholder="password" required></v-text-field>

                            <div class="red--text">{{ errorMessage }}</div>

                            <v-btn type="submit" class="mt-4" color="primary" value="log in">
                                {{ stateObj.login.name }}
                            </v-btn>


                        </form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
  
<script>
import { useAppStore } from '@/store/app';
export default {
    name: "App",
    data() {
        return {
            username: "",
            password: "",
            errorMessage: "",
            
            stateObj: {
                login: {
                    name: 'Login',
                    message: 'Register'
                }
            }
        };
    },
    methods: {
    login() {
      const appStore = useAppStore();
      const userExists = appStore.checkUserCredentials(this.username, this.password);

      if (userExists) {
        appStore.setLoginInfo({ loggedIn: true, username: this.username, image: '' });
        this.$router.replace({ name: "dashboard", params: { username: this.username } });
      } else {
        this.errorMessage = "Invalid username or password";
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    const appStore = useAppStore();

    next(vm => {
      if (!appStore.isLoggedIn()) {
        next({ name: "login" });
      } else {
        next();
      }
    });
  },
};
</script>
