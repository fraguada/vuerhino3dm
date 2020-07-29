<template>
  <v-app>
    <v-btn @click.native='makeThings'> Hit It</v-btn>
    <Viewport/>
  </v-app>
</template>

<script>
import Viewport from './components/Viewport.vue'
export default {
  name: 'App',
  components: {
    Viewport
  },
  data () {
    return {
      //
    }
  },
  methods: {
    makeThings () {
      if (window.loaded) {
        const m = new Module.Sphere([0, 0, 0], 10)
        console.log(m)
      }

      const num = 100
      for (let i = 0; i < num; i++) {
        const x = Math.random() * (20 - -20) + -20
        const y = Math.random() * (20 - -20) + -20
        const z = Math.random() * (20 - -20) + -20

        var geometry = new THREE.SphereBufferGeometry(0.5, 10, 10)
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
        var sphere = new THREE.Mesh(geometry, material)
        sphere.position.x = x
        sphere.position.y = y
        sphere.position.z = z
        scene.add(sphere)
      }
    }
  }
}
</script>
