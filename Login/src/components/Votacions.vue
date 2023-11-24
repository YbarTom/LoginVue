<template>
  <v-btn type="submit" class="mt-4" color="primary" @click="logout">Log out</v-btn>

  <div class="d-flex justify-center mt-4">
    <v-btn type="submit" class="mr-4" color="green" @click="enviarVotacion(1)">
      Opción 1 ({{ votosPorOpcion(1) }})
    </v-btn>
    <v-btn type="submit" class="mr-4" color="yellow" @click="enviarVotacion(2)">
      Opción 2 ({{ votosPorOpcion(2) }})
    </v-btn>
    <v-btn type="submit" class="mr-4" color="red" @click="enviarVotacion(3)">
      Opción 3 ({{ votosPorOpcion(3) }})
    </v-btn>
    <v-btn type="submit" class="mr-4" color="brown" @click="enviarVotacion(4)">
      Opción 4 ({{ votosPorOpcion(4) }})
    </v-btn>
  </div>
</template>
    
<script>
import { useAppStore } from '@/store/app'; 
import io from 'socket.io-client';
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
  created() {
    // Conéctate al servidor de sockets (cambia la URL según tu configuración)
    this.socket = io('http://localhost:3000'); // Cambia la URL según tu servidor
    
    // Escucha eventos del servidor (si es necesario)
    this.socket.on('actualizarVotos', (data) => {
      // Maneja la actualización de votos recibida del servidor
      console.log('Actualización de votos recibida:', data);

      // Actualiza el store local con la nueva información de votos
      const store = useAppStore();
      store.setVotos(data.votos);
    });
  },

  beforeDestroy() {
    // Desconéctate del servidor cuando el componente se destruya
    this.socket.disconnect();
  },

  methods: {
    logout() {
      this.$router.replace({ name: 'login' })
    }, enviarVotacion(opcion) {
      const store = useAppStore();
      const votos = store.getVotos();

      // Emite un evento al servidor con la opción de votación
      this.socket.emit('enviarVotacion', { opcion, votos });

      console.log(`Enviando votación para la opción ${opcion} al servidor`);

      // Simula la actualización del store local con la nueva votación
      store.setVotos([...votos, opcion]);
    },
    votosPorOpcion(opcion) {
    const votos = useAppStore().getVotos();
    return votos.filter(voto => voto === opcion).length;
  },
  },
}
</script>