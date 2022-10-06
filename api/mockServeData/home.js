// mock数据模拟
import Mock from 'mockjs'

// 图表数据
let List = []
export default {
  getStatisticalData: () => {
    // Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          Skyworth: Mock.Random.float(100, 8000, 0, 0),
          Samsung: Mock.Random.float(100, 8000, 0, 0),
          Hisense: Mock.Random.float(100, 8000, 0, 0),
          Philips: Mock.Random.float(100, 8000, 0, 0),
          Xiaomi: Mock.Random.float(100, 8000, 0, 0),
          Lenovo: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 表格
        tableData: [
          { name: 'Skyworth', todayBuy: 500, monthBuy: 3500, totalBuy: 22000 },
          { name: 'Samsung', todayBuy: 300, monthBuy: 2200, totalBuy: 24000 },
          { name: 'Hisense', todayBuy: 800, monthBuy: 4500, totalBuy: 65000 },
          { name: 'Philips', todayBuy: 1200, monthBuy: 6500, totalBuy: 45000 },
          { name: 'Xiaomi', todayBuy: 300, monthBuy: 2000, totalBuy: 34000 },
          { name: 'Lenovo', todayBuy: 350, monthBuy: 3000, totalBuy: 22000 }
        ],
        // 折线图
        orderData: {
          date: ['20220613', '20220614', '20220615', '20220616', '20220617', '20220618', '20220619'],
          data: List
        },
        // 柱状图
        userData: [
          { date: '周一', new: 17, active: 200 },
          { date: '周二', new: 10, active: 500 },
          { date: '周三', new: 12, active: 550 },
          { date: '周四', new: 60, active: 800 },
          { date: '周五', new: 65, active: 550 },
          { date: '周六', new: 53, active: 770 },
          { date: '周日', new: 33, active: 170 }
        ],
        // 饼图
        videoData: [
          { name: 'Skyworth', value: 2999 },
          { name: 'Samsung', value: 5999 },
          { name: 'Hisense', value: 1500 },
          { name: 'Philips', value: 1999 },
          { name: 'Xiaomi', value: 2200 },
          { name: 'Lenovo', value: 4500 }
        ]
      }
    }
  }
}
