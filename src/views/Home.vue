<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Info></Info>
  </div>
</template>

<script>
// @ is an alias to /src
import Info from '@/components/menuInfo.vue'
export default {
  name: 'home',
  components: {
    Info
  }
}
</script>
