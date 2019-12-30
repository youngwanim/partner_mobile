<template>
  <div class="login">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Login></Login>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
export default {
  name: 'login',
  components: {
    Login
  }
}
</script>
