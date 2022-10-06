<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <Aside/>
    </el-aside>
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <Tag/>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Aside from '@/components/Aside'
  import Header from '@/components/Header'
  import Tag from '@/components/Tag'
  
  export default {
    name: 'Home',
    components: { Aside, Header, Tag }
  }
</script>

<style lang="less" scoped>
  .el-header {
    background-color: #333;
  }
  
  .el-main {
    padding-top: 0;
  }
</style>
