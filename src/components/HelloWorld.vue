<template>
  <div class="hello">
    <header class="header">
      <div class="header-left">
        <!-- <div class="box-box">
          <img src="../assets/box-1.png" class="box-1">
          <span class="current-district">{{currentDistrict}}</span>
        </div>
        <div class="box-box">
          <img src="../assets/box-1.png" class="box-1">
          <span class="current-shop">{{currentShopCategory}}</span>
        </div> -->
        <p class="web-title">广州市饿了么外卖2018年4月份数据</p>
      </div>
      <div class="header-right">
        <div class="box-2" @click="openData"></div>
        <div class="box-3"></div>
      </div>
    </header>
    <div class="center">
      <div class="mask-bottom"></div>
      <div class="center-left" id="allmap"></div>
      <div class="fill-1">
        <img src="../assets/fill-3.png" class="fill-1-img">
        <span class="current-district">{{currentDistrict}}</span>
      </div>
      <div class="fill-2"><p>商家数据：29046家<br>菜品数据：3000000+道菜</p></div>
      <div class="fill-5"></div>
      <div class="center-right">
        <div class="right-top">
          <div class="left">
            <div class="left-item shop-number">
              <p class="title">店铺数/家</p>
              <p class="content">{{number.shopNumber}}</p>
            </div>
            <div class="left-item shop-amount">
              <p class="title">当月总销量/份</p>
              <p class="content">{{number.sellTotal}}</p>
            </div>
            <div class="left-item shop-average-amount">
              <p class="title">平均销量/份</p>
              <p class="content">{{number.sellAverage}}</p>
            </div>
          </div>
          <div class="right">
            <div class="fill-3"></div>
            <div v-show="showPie === 0">
              <div id="shopCategoryPie" class="chart-pie"></div>
              <div class="menu-table">
                <div @click="updateShopNamePie(item.name)" class="menu-item pointer" v-for="(item, index) in menuShopCategory" :key="index" v-if="index < 12"><span style="font-size: 18px">{{item.name.substr(0, 4)}}</span>  {{item.value}}%</div>
              </div>
            </div>
            <div v-show="showPie === 1">
              <div id="shopNamePie" class="chart-pie"></div>
              <div class="menu-table">
                <div @click="updateDishPie(item.name)" class="menu-item pointer" v-for="(item, index) in menuShopName" :key="index" v-if="index < 12"><span style="font-size: 18px">{{item.name.substr(0, 4)}}</span>  {{item.value}}%</div>
              </div>
            </div>
            <div v-show="showPie === 2">
              <div id="dishPie" class="chart-pie"></div>
              <div class="menu-table">
                <div class="menu-item" v-for="(item, index) in dish" :key="index" v-if="index < 12"><span style="font-size: 18px">{{item.menuname.substr(0, 4)}}</span>  {{item.percentage}}%</div>
              </div>
            </div>
            <div v-show="showPie === 3">
              <div id="initPie" class="chart-pie"></div>
              <div class="menu-table">
                <div class="menu-item" v-for="(item, index) in initData" :key="index" v-if="index < 12"><span style="font-size: 18px">{{item.class.substr(0, 4)}}</span>  {{item.percentage}}%</div>
              </div>
            </div>
            <!-- <div class="pagination">
              <img src="../assets/arrow-left.png" class="arrow" @click="prePage">
              <div class="page-num">{{currentPage}}/{{totalPage}}</div>
              <img src="../assets/arrow-right.png" class="arrow" @click="nextPage">
            </div> -->
          </div>
        </div>
        <div class="right-bottom">
          <div class="left">
            <div class="y">销量</div>
            <div class="fl">
              <div class="chart-line" @mouseover="showScore" @mouseout="hideScore">
                <div class="title"></div>
                <div id="scoreChart"></div>
              </div>
              <div class="x">
                <!-- <span>0分</span>
                <span>-</span>
                <span>1分</span>
                <span>-</span>
                <span>2分</span>
                <span>-</span> -->
                <span>3分</span>
                <span>-</span>
                <span>4分</span>
                <span>-</span>
                <span>5分</span>
              </div>
              <div class="score-tips" v-if="isShowScore">
                {{currentDistrict}}{{number.shopNumber}}家店铺评分汇总
              </div>
            </div>
          </div>
          <div class="right">
            <div class="y">销量</div>
            <div class="fl">
              <div class="chart-line" @mouseover="showDelivery" @mouseout="hideDelivery">
                <div class="title-2"></div>
                <div id="deliveryChart"></div>
              </div>
              <div class="x">
                <span>0min</span>
                <span>-</span>
                <span>15min</span>
                <span>-</span>
                <span>30min</span>
                <span>-</span>
                <span>45min</span>
                <span>-</span>
                <span>60min</span>
                <span>-</span>
                <span>75min</span>
              </div>
              <div class="score-tips" v-if="isShowDelivery">
                {{currentDistrict}}{{number.shopNumber}}铺配送时间汇总
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myMapStyle from '../myMapStyle'
import getBoundary from '../getBoundary'
import getPoint from '../getPoint'
import pieOptions from '../pieOptions'
import lineOptions from '../lineOptions'
import data from '../../static/data7.json'
import boundarys from '../boundarys'
import points from '../points'
export default {
  name: 'HelloWorld',
  data () {
    return {
      currentDistrict: '广州市',
      currentShopCategory: '',
      currentPage: 1,
      totalPage: 3,
      number: {
        shopNumber: 0,
        sellTotal: 0,
        sellAverage: 0
      },
      data: [],
      scoreChart: null,
      scoreChartOptions: {},
      deliveryChart: null,
      dileveryChartOptions: {},
      shopCategory: {},
      shopCategoryPie: null,
      shopCategoryPieOptions: {},
      shopName: {},
      shopNamePie: null,
      shopNamePieOptions: {},
      dish: {},
      dishPie: null,
      dishPieOptions: {},
      initData: {},
      initPie: null,
      initPieOptions: {},
      showPie: 3,
      map: null,
      menuShopCategory: {},
      menuShopName: {},
      isShowScore: false,
      isShowDelivery: false
    }
  },
  mounted () {
    // 初始化地图
    var map = new window.BMap.Map('allmap')
    map.centerAndZoom(new window.BMap.Point(113.500, 23.192), 10)
    map.setMapStyle({ styleJson: myMapStyle })
    map.disableDragging()
    setTimeout(() => {
      boundarys.forEach((item) => {
        getBoundary(map, item, (res, pointArray) => { this.chooseDistrict(res, pointArray) })
      })
      points.forEach((item) => {
        getPoint(map, item, (res) => { this.chooseDistrict(res.name) })
      })
    }, 200)
    // 店铺评分表
    this.scoreChart = this.echarts.init(document.getElementById('scoreChart'))
    this.scoreChart.setOption(this.scoreChartOptions)
    // 配送时间表
    this.deliveryChart = this.echarts.init(document.getElementById('deliveryChart'))
    this.deliveryChart.setOption(this.dileveryChartOptions)
    // 初始化饼图
    this.initPie = this.echarts.init(document.getElementById('initPie'))
    this.initPie.setOption(this.initPieOptions)
    // 店铺种类饼图
    this.shopCategoryPie = this.echarts.init(document.getElementById('shopCategoryPie'))
    this.shopCategoryPie.setOption(this.shopCategoryPieOptions)
    // 店铺名称饼图
    this.shopNamePie = this.echarts.init(document.getElementById('shopNamePie'))
    this.shopNamePie.setOption(this.shopNamePieOptions)
    // 菜品饼图
    this.dishPie = this.echarts.init(document.getElementById('dishPie'))
    this.dishPie.setOption(this.dishPieOptions)

    this.updateScore(data)
    this.updateDeliveryTime(data)
    this.updateNumber(data)
    this.updateInitPie(data)

    this.map = map
  },
  created () {
    this.data = data.region
  },
  methods: {
    showScore () {
      this.isShowScore = true
    },
    hideScore () {
      this.isShowScore = false
    },
    showDelivery () {
      this.isShowDelivery = true
    },
    hideDelivery () {
      this.isShowDelivery = false
    },
    openData () {
      console.log('hjhh')
    },
    chooseDistrict (districtId, pointArray) {
      this.map.enableScrollWheelZoom()
      this.map.enableContinuousZoom()
      this.map.setViewport(pointArray)
      this.currentDistrict = districtId
      this.showPie = 0
      this.currentShopCategory = ''
      this.getDistrictData().then((res) => {
        // 更新区域数据
        this.updateNumber(res)
        // 更新评分表
        this.updateScore(res)
        // 更新配送费表
        this.updateDeliveryTime(res)
        // 更新种类
        this.updateShopCategory(res)
      })
    },
    getDistrictData () {
      return new Promise((resolve) => {
        this.data.forEach((item) => {
          if (item.name === this.currentDistrict) {
            resolve(item)
          }
        })
      })
    },
    initNumber () {
      let shopNumber = 0
      let sellTotal = 0
      let sellAverage = 0
      this.data.forEach(item => {
        shopNumber = shopNumber + parseInt(item.shopnum)
        sellTotal = sellTotal + parseInt(item.allsell)
        sellAverage = sellAverage + parseInt(item.avesell)
      })
      this.number = {
        shopNumber: shopNumber,
        sellTotal: sellTotal,
        sellAverage: sellAverage
      }
    },
    updateNumber (districtData) {
      this.number = {
        shopNumber: districtData.shopnum,
        sellTotal: districtData.allsell,
        sellAverage: districtData.avesell
      }
    },
    updateScore (districtData) {
      let x = []
      let y = []
      districtData.markform.forEach((item) => {
        if (item.mark >= 3) {
          x.push(item.mark)
          y.push(item.allsell)
        }
      })
      this.scoreChartOptions = lineOptions(x, y)
      this.scoreChart.setOption(this.scoreChartOptions)
    },
    updateDeliveryTime (districtData) {
      let x = []
      let y = []
      districtData.timeform.forEach((item) => {
        x.push(item.time)
        y.push(item.allsell)
      })
      this.dileveryChartOptions = lineOptions(x, y)
      this.deliveryChart.setOption(this.dileveryChartOptions)
    },
    updateInitPie (districtData) {
      this.initData = districtData.classform
      let data = []
      districtData.classform.forEach((item) => {
        let dataItem = {
          value: item.percentage,
          name: item.class
        }
        data.push(dataItem)
      })
      data = data.slice(0, 12)
      this.initPieOptions = pieOptions(data)
      this.initPie.setOption(this.initPieOptions)
      this.initPie.on('click', (params) => {
        this.initData.forEach((item) => {
          if (item.class === params.data.name) {
            this.number = {
              shopNumber: item.shopnum,
              sellTotal: item.allsell,
              sellAverage: item.avesell
            }
          }
        })
      })
    },
    updateShopCategory (districtData) {
      this.shopCategory = districtData.classform
      let data = []
      districtData.classform.forEach((item) => {
        let dataItem = {
          value: item.percentage,
          name: item.class
        }
        data.push(dataItem)
      })
      data = data.slice(0, 12)
      this.menuShopCategory = data
      this.shopCategoryPieOptions = pieOptions(data)
      this.shopCategoryPie.setOption(this.shopCategoryPieOptions)
      this.shopCategoryPie.on('click', (params) => {
        this.updateShopNamePie(params)
      })
    },
    updateShopNamePie (params) {
      this.showPie = 1
      this.currentShopCategory = params.data.name
      this.shopCategory.forEach((item) => {
        if (item.class === params.data.name) {
          this.shopName = item.shops
          this.number = {
            shopNumber: item.shopnum,
            sellTotal: item.allsell,
            sellAverage: item.avesell
          }
        }
      })
      let data = []
      this.shopName.forEach((item) => {
        let dataItem = {
          value: item.percentage,
          name: item.shopname
        }
        data.push(dataItem)
      })
      data = data.slice(0, 12)
      this.menuShopName = data
      this.shopNamePieOptions = pieOptions(data)
      this.shopNamePie.setOption(this.shopNamePieOptions)
      this.shopNamePie.on('click', (params) => {
        this.updateDishPie(params)
      })
    },
    updateDishPie (params) {
      this.showPie = 2
      this.shopName.forEach((item) => {
        if (item.shopname === params.data.name) {
          this.dish = item.menus
          this.number = {
            shopNumber: 1,
            sellTotal: item.shopsell,
            sellAverage: item.shopsell
          }
        }
      })
      let data = []
      this.dish.forEach((item) => {
        let dataItem = {
          value: item.percentage,
          name: item.menuname
        }
        data.push(dataItem)
      })
      data = data.slice(0, 12)
      this.dishPieOptions = pieOptions(data)
      this.dishPie.setOption(this.dishPieOptions)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  .header{
    width: 100%;
    // height: 67px;
    border-bottom: 2px solid #00bcff;
    padding-bottom: 14px;
    display: flex;
    justify-content: space-between;
    .header-left{
      display: flex;
      justify-content: flex-start;
      .web-title{
        color: white;
        font-size: 16px;
        line-height: 29px;
      }
      .box-box{
        width: 92px;
        height: 29px;
        margin-right: 42px;
      }
      .box-1{
        width: 92px;
        height: 29px;
        margin-right: 42px;
      }
      .current-district, .current-shop{
        color: white;
        font-size:16px;
        height: 29px;
        line-height: 29px;
        position: relative;
        top: -32px;
      }
    }
    .header-right{
      display: flex;
      justify-content: flex-end;
      .box-2{
        width: 112px;
        height: 29px;
        margin-left: 42px;
        background: url("../assets/box-2.png");
        background-size: cover;
        cursor: pointer;
        &:after{
          content: "数据报告";
          color:white;
          line-height: 29px;
          font-size:16px;
        }
      }
      .box-3{
        width: 112px;
        height: 29px;
        margin-left: 42px;
        background: url("../assets/box-2.png");
        background-size: cover;
        &:after{
          content: "关于";
          color:white;
          line-height: 29px;
          font-size:16px;
        }
      }
    }
  }
  .center{
    width: 100%;
    padding-top: 42px;
    height: 880px;
    .center-left{
      width: 880px;
      height: 945px;
      margin-right: 46px;
      float: left;
    }
    // .center-left:hover{
    //   border: 1px solid #00BCFF;
    // }
    .fill-1{
      width: 118px;
      height: 29px;
      position: absolute;
      top: 123px;
      left: 78px;
      .fill-1-img{
        width: 118px;
        height: 29px;
      }
      .current-district{
        color: white;
        font-size:16px;
        height: 29px;
        line-height: 29px;
        position: relative;
        top: -32px;
      }
    }
    .mask-bottom {
      position: absolute;
      background: rgb(12, 23, 28);
      z-index: 9;
      top: 992px;
      left: 78px;
      width: 880px;
      height: 85px;
    }
    .fill-2{
      background: url("../assets/fill-2.png");
      background-size: cover;
      width: 200px;
      height: 65px;
      position: absolute;
      z-index: 10;
      top: 927px;
      left: 758px;
      p {
        position: relative;
        top: 10px;
        color:white;
        line-height: 25px;
        font-size:14px;
        text-align: right;
        padding-right: 12px;
      }
    }
    .fill-5{
      background: url("../assets/mask.png");
      background-size: cover;
      width: 521px;
      height: 55px;
      position: absolute;
      top: 948px;
      left: 78px;
      opacity: 0.8;
    }
    .center-right{
      width: 828px;
      height: 879px;
      float: left;
      color: white;
      .right-top{
        display: flex;
        justify-content: space-between;
        padding-bottom: 54px;
        border-bottom: 1px solid #00bcff;
        .left{
          width: 312px;
          height: 584px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .left-item{
            width: 312px;
            height: 156px;
            .title{
              border-bottom: 10px solid #00bcff;
              text-align: left;
              font-size: 20px;
              padding-bottom: 14px;
            }
            .content{
              text-align: left;
              font-size: 90px;
            }
          }
        }
        .right{
          width: 384px;
          height: 584px;
          background-color: #0A2129;
          .fill-3{
            background: url("../assets/fill-3.png");
            background-size: cover;
            width: 118px;
            height: 29px;
            &:after{
              content: "种类";
              color:white;
              line-height: 29px;
              font-size: 20px;
            }
          }
        }
      }
      .right-bottom{
        margin-top: 26px;
        display: flex;
        justify-content: space-between;
        .left{
          width: 392px;
          height: 220px;
        }
        .right{
          width: 392px;
          height: 220px;
        }
      }
    }
  }
}
.chart-pie{
  width: 242px;
  height: 242px;
  margin-top: 36px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.menu-table{
  width: 312px;
  height: 146px;
  margin-top: 56px;
  color: white;
  margin-left: 50%;
  transform: translateX(-50%);
  .menu-item{
    float: left;
    width: 144px;
    height: 30px;
    font-size: 20px;
    text-align: left;
    white-space: nowrap;
    padding-left: 12px;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .pointer{
    cursor: pointer;
  }
}
.y{
  width: 22px;
  height: 100%;
  float: left;
}
.fl{
  float: left;
}
.chart-line{
  width: 359px;
  height: 200px;
  background: url("../assets/square-bg.png");
  background-size: cover;
  position: relative;
  .title{
    width: 118px;
    height: 29px;
    background: url("../assets/fill-1.png");
    background-size: cover;
    &:after{
      content: "店铺评分";
      color:white;
      line-height: 29px;
      font-size: 20px;
    }
  }
  .title-2{
    width: 118px;
    height: 29px;
    background: url("../assets/fill-1.png");
    background-size: cover;
    &:after{
      content: "配送时间";
      color:white;
      line-height: 29px;
      font-size: 20px;
    }
  }
}
.x{
  width: 359px;
  height: 20px;
  display: flex;
  justify-content: space-between;
}
.pagination{
  width: 100%;
  height: 30px;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  .arrow{
    width: 12px;
    height: 12px;
    margin-top: 4px;
  }
  .page-num{
    width: 50px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
  }
}
#scoreChart, #deliveryChart{
  width: 100%;
  height: 170px;
  // transform: scale(1.27, 2.5);
  // position: absolute;
  // top: 52px;
  // background-color: blue;
}
.score-tips {
  width: 260px;
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
  margin-left: 50px;
  background: rgb(68, 68, 68);
  border-radius: 20px;
}
</style>
