<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <!--  左上角  -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg"/>
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-6-21</span></p>
          <p>上次登录地点：<span>杭州</span></p>
        </div>
      </el-card>
      <!--  左下角  -->
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
              v-for="(value, key) in tableLabel" :key="key" :prop="key" :label="value">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <!--  右上角  -->
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${ item.icon }`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!--  折线图  -->
      <el-card style="height: 280px">
        <ECharts :chartData="echartData.order" style="height: 280px"/>
      </el-card>
      <div class="graph">
        <!--  柱状图  -->
        <el-card style="height: 265px">
          <ECharts :chartData="echartData.user" style="height: 240px"/>
        </el-card>
        <!--  饼状图  -->
        <el-card style="height: 265px">
          <ECharts :chartData="echartData.video" :isAxisChart="false" style="height: 240px"/>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { getData } from '../../api/data'
  import ECharts from '@/components/ECharts'
  
  export default {
    name: 'home',
    components: { ECharts },
    data() {
      return {
        userImg: require('@/assets/img/user.jpg'),
        tableData: [],
        tableLabel: { name: '品牌', todayBuy: '今日购买', monthBuy: '本月购买', totalBuy: '总购买' },
        countData: [
          { name: "今日支付订单", value: 1234, icon: "success", color: "#2ec7c9" },
          { name: "今日收藏订单", value: 210, icon: "star-on", color: "#ffb980" },
          { name: "今日未支付订单", value: 1234, icon: "s-goods", color: "#5ab1ef" },
          { name: "本月支付订单", value: 1234, icon: "success", color: "#2ec7c9" },
          { name: "本月收藏订单", value: 210, icon: "star-on", color: "#ffb980" },
          { name: "本月未支付订单", value: 1234, icon: "s-goods", color: "#5ab1ef" }
        ],
        echartData: {
          order: {
            xData: [],
            series: []
          },
          user: {
            xData: [],
            series: []
          },
          video: {
            series: []
          }
        }
      }
    },
    mounted() {
      getData().then(
        response => {
          const { code, data } = response.data
          if (code === 20000) {
            this.tableData = data.tableData
            const order = data.orderData
            const xData = order.date
            const keyArray = Object.keys(order.data[0])
            const series = []
            keyArray.forEach(key => {
              series.push({
                name: key,
                data: order.data.map(item => item[key]),
                type: 'line'
              })
            })
            
            // 渲染折线图
            this.echartData.order.xData = xData
            this.echartData.order.series = series
            
            // 渲染柱状图
            this.echartData.user.xData = data.userData.map(item => item.date)
            this.echartData.user.series = [
              {
                name: '新增用户',
                data: data.userData.map(item => item.new),
                type: 'bar'
              },
              {
                name: '活跃用户',
                data: data.userData.map(item => item.active),
                type: 'bar'
              }
            ]
            
            // 渲染饼状图
            this.echartData.video.series = [
              {
                data: data.videoData,
                type: 'pie'
              }
            ]
          }
        }
      )
    }
  }
</script>
