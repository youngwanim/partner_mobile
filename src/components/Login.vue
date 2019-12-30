<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-row align="center" justify="center">
            <v-img
              src="/img_main_eng.jpg"
              class="grey lighten-2 mt-8"
              max-width="300"
            ></v-img>
          </v-row>
          <v-form
           ref="form"
           v-model="valid"
           lazy-validation
           class="ma-4"
          >
           <v-text-field
             v-model="account"
             :rules="accountRules"
             label="Account"
             required
           ></v-text-field>

           <v-text-field
             v-model="password"
             :rules="passwordRules"
             label="Password"
             required
           ></v-text-field>

           <v-btn
             :disabled="!valid"
             color="success"
             class="mr-4"
             @click="submit"
           >
             Log in
           </v-btn>


          </v-form>
        </v-card>
      </v-col>
    </v-row>

</div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "login",
    data() {
      return {
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
      // sessionStorage.clear()
    },
    computed: {
      ...mapGetters([
        'getAccount',
        'getPassword',
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
