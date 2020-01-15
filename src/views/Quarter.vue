<template>
  <div class="quarter">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <quarterInfo></quarterInfo>
  </div>
</template>

<script>
// @ is an alias to /src
import quarterInfo from '@/components/quarterInfo.vue'
export default {
  name: 'quarter',
  components: {
    quarterInfo
  }
}
</script>
