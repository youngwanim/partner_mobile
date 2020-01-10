<template>
  <div>
    <!-- <v-row align="center" justify="center">
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card> -->
          <v-row align="center" justify="center">
            <v-img
              src="/img_main_eng.jpg"
              class="grey lighten-2 mt-12 ml-12 mr-12"
              max-width="200"
            ></v-img>
          </v-row>
          <v-form
           ref="form"
           v-model="valid"
           lazy-validation
           class="mt-12 ml-12 mr-12"
          >
           <v-text-field
             v-model="account"
             :rules="accountRules"
             label="Account"
             required
           ></v-text-field>

           <v-text-field
             v-model="password"
             :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
             :rules="passwordRules"
             :type="show1 ? 'text' : 'password'"
             label="Password"
             required
             @click:append="show1 = !show1"
           ></v-text-field>

           <v-btn
             :disabled="!valid"
             color="yellow"
             class="mr-4"
             @click="submit"
           >
             Log in
           </v-btn>


          </v-form>
        <!-- </v-card>
      </v-col>
    </v-row> -->

</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import VueCookies from 'vue-cookies'

  export default {
    name: "login",
    data() {
      return {
        show1: false,
        valid: true,
        accountRules: [
          v => !!v || 'Name is required',
        ],
        passwordRules: [
          v => !!v || 'Name is required',
        ]
      }
    },
    created() {
      if (VueCookies.get('openid') && VueCookies.get('token')) {
        console.log('openid&token: ', VueCookies.get('openid'), VueCookies.get('token') )
        this.validation()
      }
    },
    computed: {
      ...mapGetters([
        'getAccount',
        'getPassword',
        'getAuthState',
        'getLoginFail'
      ]),
      account: {
        get(){
          return this.getAccount
        },
        set(value){
          this.$store.commit('setAccount', value)
        },
      },
      password: {
        get(){
          return this.getPassword
        },
        set(value){
          this.$store.commit('setPassword', value)
        },
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('LOGIN')
      },
      validation() {
        this.$store.dispatch('VALIDATION')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 500px;
    height: auto;
    border: 1px solid #ffb700;
    padding: 30px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -129px;
    z-index: 1;
    background: #fff;
    border-radius: 10px;
  }

  .btns {
    text-align: center;
  }
  .login{
    color: #fff!important;
  }

  .obj1 {
    width: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -360px;
    img {
      max-width: 100%;
    }
  }
  .errorMsg{
    padding: 10px 0;
    font-size: 12px;
    color: red;
  }
</style>
