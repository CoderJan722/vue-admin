<template>
  <header>
    <div class="left-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="userImg">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex'
  
  export default {
    name: 'Header',
    data() {
      return {
        userImg: require('../assets/img/user.jpg')
      }
    },
    methods: {
      handleMenu() {
        this.$store.commit('collapseMenu')
      },
      logOut() {
        this.$store.commit('clearToken')
        this.$store.commit('clearMenu')
        this.$router.push("/login")
      }
    },
    computed: {
      ...mapState({
        tags: state => state.tab.tabsList
      })
    }
  }
</script>

<style lang="less" scoped>
  header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
  
  .left-content {
    display: flex;
    align-items: center;
    
    .el-button {
      margin-right: 20px;
    }
  }
  
  .right-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  
  /deep/ .el-breadcrumb__item {
    .el-breadcrumb__inner {
      font-weight: normal;
      
      &.is-link {
        color: #666
      }
      
      a {
        color: #666
      }
    }
    
    &:last-child {
      .el-breadcrumb__inner {
        color: #fff;
      }
    }
  }
</style>
