<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import store from '@/store'

export default {
  components: { SidebarItem, Logo },
  data(){
      return {
          route: []   
      }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.route;
    //  this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
    methods:{
      deal(route, rs){
          for (let i = 0; i < route.length; i++){
              for (let i1 = 0; i1 < rs.length; i1++){
                  if (rs[i1] === route[i].path){
                      route.splice(i, 1);
                      i -= 1;
                  }
              }
          }
          return route;
      }
    },
    created() {
        //角色获取动态路由
        let userInfo = store.state.user.user;
        let route = this.$router.options.routes;
        let rs = [];
        if (userInfo.authority === 'TENANT_ADMIN') {
            rs = ['/tenant', '/tenantAdmin']
        }else if (userInfo.authority === 'SYS_ADMIN') {
            rs = ['/client', '/asset', '/device', '/block', '/customer']
        }else if (userInfo.authority === 'CUSTOMER_USER') {
            rs = ['/client', '/customer', '/tenant', '/tenantAdmin']
        }
        route = this.deal(route, rs)
        this.route = route
    }
}
</script>
