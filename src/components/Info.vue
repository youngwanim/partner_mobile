<template>
  <div class="partner_info">
  <v-card class="pa-1 ma-4">
    <v-card-title>Product list</v-card-title>
    <v-card-text>
      <v-list>
         <template v-for="(item, index) in ex_menuStatus">
           <v-list-item  three-line
             :key="item.id"
           >
             <v-list-item-avatar>
               <v-img :src="'http://viastelle-main.oss-cn-shanghai.aliyuncs.com/' + item.image_thumbnail"></v-img>
             </v-list-item-avatar>

             <v-list-item-content>
               <v-list-item-subtitle v-html="item.menu_name"></v-list-item-subtitle>
               <v-list-item-subtitle v-html="item.menu_name_cn"></v-list-item-subtitle>
             </v-list-item-content>
           </v-list-item>
           <v-list-item
             :key="item.id"
           >
             <v-list-item-content max-height="30">
               <v-list-item-subtitle v-html="'price: ' + item.price"></v-list-item-subtitle>
             </v-list-item-content>
             <v-list-item-content max-height="30">
               <v-list-item-subtitle class="red--text" v-if="!item.sales_status" v-html="'not selling anymore'"></v-list-item-subtitle>
             </v-list-item-content>
           </v-list-item>
           <v-divider v-if="index < ex_menuStatus.length-1" :key="index"></v-divider>
         </template>
       </v-list>
     </v-card-text>
  </v-card>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
        datacollection: null,
        ex_menuStatus: [
          {
            menu_id: 82,
            menu_name: 'Eggplant Fried Rice with Lotus root Tteok-galbi',
            menu_name_cn: '茄子炒饭配莲藕牛肉饼',
            image_thumbnail: 'bumps/fried/img_thumb_friedrice.jpg',
            price: 58,
            sales_status: true,
            sales_end_date: ''
          },
          {
            menu_id: 83,
            menu_name: 'Popeye Spinach Fried Rice with Pork Mushroom Bulgogi',
            menu_name_cn: '大力水手炒饭配猪肉炒蘑菇',
            image_thumbnail: 'bumps/popeye/img_thumb_popeye.jpg',
            price: 58,
            sales_status: true,
            sales_end_date: ''
          },
          {
            menu_id: 113,
            menu_name: 'Black bean sauce with shrimp & egg fried rice',
            menu_name_cn: '炸酱虾仁鸡蛋炒饭',
            image_thumbnail: 'bumps/bbsfried/img_thumb_blackbeansaucerice.jpg',
            price: 58,
            sales_status: true,
            sales_end_date: ''
          },
          {
            menu_id: 114,
            menu_name: 'Egg Fried Rice and Eggplant with Oyster Sauce',
            menu_name_cn: '蚝油炒茄子配鸡蛋炒饭',
            image_thumbnail: 'bumps/efroyster/img_thumb_eggricewitheggplant.jpg',
            price: 58,
            sales_status: false,
            sales_end_date: ''
          }

        ]
      }
    },
    mounted () {
      console.log('mounted')
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['Red', 'Blue'],
          datasets: [
            {
              label: 'Egg Fried Rice',
              backgroundColor: '#f80000',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Black bean sauce',
              backgroundColor: '#00ff00',
              data: [this.getRandomInt(), this.getRandomInt()]
            },
            {
              label: 'Popeye Spinach Fried Rice',
              backgroundColor: '#000079',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Eggplant Fried Rice with Lotus root Tteok-galbi',
              backgroundColor: '#f0000f',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
        console.log(JSON.stringify(this.datacollection))
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .partner_info {
    text-align: left;
  }
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
