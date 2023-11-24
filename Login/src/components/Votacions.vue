<template>
  
    <v-btn type="submit" class="mt-4" color="primary" @click="logout">Log out</v-btn>
  

  <div class="d-flex justify-center mt-4">
    <v-btn type="submit" class="mr-4" color="green" @click="enviarVotacion(1)">Opcio 1</v-btn>
    <v-btn type="submit" class="mr-4" color="yellow">Opcio 2</v-btn>
    <v-btn type="submit" class="mr-4" color="red">Opcio 3</v-btn>
    <v-btn type="submit" class="mr-4" color="brown">Opcio 4</v-btn>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      username: this.$route.params.username
    }
  },
  methods: {
    logout() {
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>