<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <v-app v-bind:class="{ pink: !getAuthState }">
      <v-app-bar max-height="48" color="amber darken-1" dense dark >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="font-weight-bold">Overview</v-toolbar-title>
      </v-app-bar>
      <div id="nav" v-if="getAuthState">
        <!-- <router-link to="/">INFO</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/sales">Sample</router-link> -->
        <v-tabs
          fixed-tabs
          color= "#ffffff"
          slider-color="amber darken-1"
          height="40"
        >
          <v-tab>
            <router-link to="/quarter">BY QUARTER</router-link>
          </v-tab>
          <v-tab>
            <router-link to="/about">BY MENU</router-link>
          </v-tab>
          <v-tab>
            <router-link to="/sales">BY MONTH</router-link>
          </v-tab>
        </v-tabs>
      </div>
      <router-view/>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-title>Foo</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Bar</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Fizz</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Buzz</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-app>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
    computed: {
      ...mapGetters([
        'getAccount',
        'getPassword',
        'getAuthState',
        'getLoginFail'
      ])
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>
<style lang="scss">
@font-face {
  font-family: 'DNIPro';
  src: url('assets/fonts/DINPro-Black.otf') format('opentype'),
      url('/assets/fonts/DINPro-Black.otf') format('opentype');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'DNIPro';
  src: url('./assets/fonts/DINPro-Bold.otf') format('opentype'),
      url('/assets/fonts/DINPro-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'DNIPro';
  src: url('./assets/fonts/DINPro-Light.otf') format('opentype'),
      url('/assets/fonts/DINPro-Light.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'DNIPro';
  src: url('./assets/fonts/DINPro-Medium.otf') format('opentype'),
      url('/assets/fonts/DINPro-Medium.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'DNIPro';
  src: url('./assets/fonts/DINPro-Regular.otf') format('opentype'),
      url('/assets/fonts/DINPro-Regular.otf') format('opentype');
  font-weight: 300;
  font-style: normal;
}

#app {
  font-family: 'DNIPro', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #e6e6e6;
  color: #795548;
  .pink {
    background-color: #ffffff;
  }
}

#nav {

  .v-tab {
    padding: 0;

    a {
      font-weight: bold;
      color: #b3b3b3;
      text-decoration: none;
      font-size: 10px;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
    &.v-tab--active{
      a{
        color: #333333;
      }
    }
  }
}
</style>
