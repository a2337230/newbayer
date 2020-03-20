<template>
  <div v-if="myCityShow" class="select-city" @click.stop="clickHandel">
    <section class="address">
      <div class="top">
        <span>配送至</span>
        <img src="../../src/assets/mall/delete.png" @click="closeHandel">
      </div>
      <section class="address-title">
        <div @click="provinceSelected" :class="[Province ? 'accolor' : '']">{{ Province?Province:'请选择' }}
          <img :src="Province?s_imgUrl:imgUrl">
        </div>
        <div @click="citySelected" class="city" :class="[City ? 'accolor': 'color']" v-show="twoshow">{{ City?City:'请选择' }}
          <div class="line-container">
            <img :src="City?s_imgUrl:imgUrl">
            <span class="line"></span>
          </div>
        </div>
        <div @click="districtSelected" class="district" :class="District ? 'accolor': 'color'" v-show="threeshow">{{ District?District:'请选择' }}
          <div class="line-container">
            <img :src="District?s_imgUrl:imgUrl">
            <span class="line"></span>
          </div>
        </div>
        <div @click="areaSelected" class="countyArea" :class="countyArea ? 'accolor': 'color'" v-show="fourshow&&countyAreaList.length>0">{{ countyArea?countyArea:'请选择' }}
          <div class="line-container">
            <img :src="countyArea?s_imgUrl:imgUrl">
            <span class="line"></span>
          </div>
        </div>
      </section>

      <ul v-show="showProvince" class="proJuli">
        <span class="s-title">选择省份/地区</span>
        <li class="addList" v-for="(v,k) in provinceList" @click="getProvinceId(v.id, v.name, k)" :key="v.id"  :class="{active : v.selected}"><span>{{v.name}}</span></li>
      </ul>
      <ul v-show="showCity" class="citJuli">
        <span class="s-title">选择城市</span>
        <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)"  :key="v.id"  :class="{active : v.selected}"><span>{{v.name}}</span></li>
      </ul>
      <ul v-show="showDistrict" class="disJuli">
        <span class="s-title">选择区/县</span>
        <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)" :key="v.id" :class="{active : v.selected}"><span>{{v.name}}</span></li>
      </ul>
      <ul v-show="showArea" class="areaJuli">
        <span class="s-title">选择乡/镇</span>
        <li class="addList" v-for="(v,k) in countyAreaList" @click="getCountyAreaId(v.id, v.name, k)" :key="v.id" :class="{active : v.selected}"><span>{{v.name}}</span></li>
      </ul>
    </section>
    <div class="layout" :class="{layoutBg:islayout}" @click="closeAdd()"></div>
  </div>
</template>
<script>
import { GetAreaByLevel } from '@/api/rj-server.js'

export default {
  data () {
    return {
      activeStep: 0,
      myCityShow: false,
      islayout: false,
      showDeter: false,
      twoshow: false,
      threeshow: false,
      fourshow: false,
      userAddress: '',
      codeAddress: '',
      oneliIndex: '', // 用于高亮子菜单
      twoliIndex: '',
      titleIndex: Number,
      showProvince: true, // 第一个li默认显示
      showCity: false, // 第二个li默认隐藏
      showDistrict: false, // 第三个li默认隐藏
      showArea: false,
      provinceList: [],
      showCityList: [],
      showDistrictList: [],
      countyAreaList: [],
      province: 0,
      city: 0,
      district: 0,
      countyAreaCode: 0,
      GetProvinceId: 2,
      District: '',
      Province: '',
      City: '',
      countyArea: '',
      // v-for循环判断是否为当前
      selected: true,
      // provinceList: maps.map, // 三级联动城市列表
      selectNameList: [],
      s_imgUrl: require('./../../src/assets/mall/s_circle.png'),
      imgUrl: require('./../../src/assets/mall/circle.png'),
      id: 0,
      level: 0,
      isFlag: false,
      selectedCode: '',
    }
  },
  mounted () {
    document.querySelector('body').style.backgroundColor = '#f5f7fa'
    this._GetAreaByLevel(0,0)
  },
  created () {
    if (this.$route.query.data !== undefined) {
      this.showDeter = true
      this.headerTxt = '编辑收货地址'
      let editDate = JSON.parse(this.$route.query.data)
      this.province = editDate.province
      this.city = editDate.city
      this.district = editDate.district
      address.getAddressData({}).then((res) => {
        if (res.isSuccess === 1) {
          // 初始化页面，如果是编辑地址的话，则
          this.twoshow = true // 控制第二个nav显示
          this.threeshow = true // 给第三个nav显示
          this.Province = editDate.areaDescription.split(' ')[0]
          this.City = editDate.areaDescription.split(' ')[1]
          this.District = editDate.areaDescription.split(' ')[2]
          this.showCityList = this._filter(this.provinceList, 'city', editDate.province) // editDate.province由后台获取的id
          this.showDistrictList = this._filter(this.showCityList, 'district', editDate.city) // editDate.city由后台获取的id
          // 高亮后台返回选中的地址，需要对应id
          this._newArr(this.provinceList, editDate.province)
          this._newArr(this.showCityList, editDate.city)
          this._newArr(this.showDistrictList, editDate.district)
        }
      })
    } else {
    }
  },
  methods: {
    clickHandel() {

    },

    // 获取地址
    async _GetAreaByLevel(id, level){
      let params = {
        id: id,
        level: level
      }
      let data = await GetAreaByLevel(params)
      if(data.Code == 200){
        if(level==0){
          this.provinceList = data.Data
          if(this.isFlag){
            this._newArr(this.provinceList, this.selectedCode.split('_')[0])
          }
        }else if(level==1){
          this.showCityList = data.Data
          if(this.isFlag){
            this._newArr(this.showCityList, this.selectedCode.split('_')[1])
          }
        }else if(level==2){
          this.showDistrictList = data.Data
          if(this.isFlag){
            this._newArr(this.showDistrictList, this.selectedCode.split('_')[2])
          }
        }else{
          this.countyAreaList = data.Data
          if(this.isFlag){
            this._newArr(this.countyAreaList, this.selectedCode.split('_')[3])
          }
        }
      }else{
        if(level==0){
          this.provinceList = []
        }else if(level==1){
          this.showCityList = []
        }else if(level==2){
          this.showDistrictList = []
        }else{
          this.countyAreaList = []
          this.fourshow = false
          this.showDeter = true
          this.userAddress = this.Province + '-' + this.City + '-' + this.District + '-' + this.countyArea
          this.codeAddress = this.province + '_'+ this.city + '_'+ this.district + '_' + this.countyAreaCode
          this.myCityShow = false
          this.islayout = false
          this.isFlag = false
          this.$emit('callback', this.userAddress, this.codeAddress)
        }
      }
    },

    next() {
      if (this.active++ > 2) this.active = 0;
    },

    // province,city,district,area
    cityShow(name, code){
      this.myCityShow = true
      this.islayout = true
      if(this.isFlag&&code!='1_0_0_0'){
        this.Province = name.split('-')[0]
        this.City = name.split('-')[1]
        this.District = name.split('-')[2]
        this.countyArea = name.split('-')[3]
        this.selectedCode = code
        if(code.split('_')[0]!=0){
          this._GetAreaByLevel(0,0)
        }
        if(code.split('_')[1]!=0){
          this.twoshow = true
          this._GetAreaByLevel(code.split('_')[0],1)
        }
        if(code.split('_')[2]!=0){
          this.threeshow = true
          this._GetAreaByLevel(code.split('_')[1],2)
        }
        if(code.split('_')[3]!=0){
          this.fourshow = true
          this._GetAreaByLevel(code.split('_')[2],3)
        }
      }

      if(this.District || this.countyArea){
        this.$nextTick(() => {
          if(this.countyArea){
            this.showArea = true
            this.container = document.querySelector('.countyArea')
          } else if(this.District){
            this.showDistrict = true
            this.container = document.querySelector('.district')
          }
          let line = this.container.querySelector('.line')
          let dian = document.querySelectorAll('.address-title img')
          let l = this.container.offsetLeft - dian[1].offsetLeft - dian[0].offsetLeft - $('.address-title img').width()
          line.style.left = -l + 'px'
          line.style.width = l + 'px'
        })
      }else{
        this.showProvince = true
      }
    },

    closeAdd() {
      // 点击空白处关闭弹框
      this.myCityShow = false
      this.islayout = false
    },

    closeHandel() {
      this.isFlag = true
      this.showDeter = true
      this.myCityShow = false
      this.islayout = false
      this.Province = ''
      this.City = ''
      this.District = ''
      this.countyArea = ''
      this.province = 0
      this.city = 0
      this.district = 0
      this.countyAreaCode = 0
      this.twoshow = false
      this.threeshow = false
      this.fourshow = false

      this.showProvince = false
      this.showCity = false
      this.showDistrict = false
      this.showArea = false

      this._newArr(this.provinceList, -1)
      this._newArr(this.showCityList, -1)
      this._newArr(this.showDistrictList, -1)
      this._newArr(this.countyAreaList, -1)
    },

    determine () {
      this.myCityShow = false
      this.islayout = false
      this.userAddress = this.Province + ' ' + this.City + ' ' + this.District
    },

    _newArr (arr, selectid) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == selectid) {
          this.$set(arr[i], 'selected', true)
        } else if (selectid == -1) {
          this.$set(arr[i], 'selected', false)
        }
      }
      return arr
    },

    _filter (add, name, code) { // 数组，对应数组内容，对应数组id
      let result = []
      for (let i = 0; i < add.length; i++) {
        if (code === add[i].id) {
          result = add[i][name]
        }
      }
      return result
    },

    _gotoTop (info, index) { // 滚动距离 --> 对应class,第几个index
      let proJuliBox = document.querySelector(info)
      let activeBox = document.getElementsByClassName('active')[index]
      let t = activeBox.offsetTop - 67 + 20 // 后面的数据，根据页面情况自己调整
      proJuliBox.scrollTo(0, t)
    },

    getProvinceId(code, input, index) { // 点击第一个li
      this.selectNameList.push(input)
      this.titleIndex = Number
      this.province = code
      this.Province = input // 获取选中的省份
      this.showProvince = false
      this.showCity = true
      this.showDistrict = false
      this.showArea = false
      // this.showCityList = this._filter(this.provinceList, 'city', this.province)
      this._GetAreaByLevel(code, 1)
      // 点击选择当前
      this.provinceList.map(a => { a.selected = false })
      this.provinceList[index].selected = true
      this.twoshow = true // 控制第二个nav显示
      this.$nextTick(() => {
        let container = document.querySelector('.city')
        let line = container.querySelector('.line')
        let dian = document.querySelectorAll('.address-title img')
        let l = container.offsetLeft - dian[0].offsetLeft - $('.address-title img').width()
        line.style.left = -l + 'px'
        line.style.width = l + 'px'
      })
      this.City = '' // 第二nav置空
      this.District = ''
      this.countyArea = ''
      this.threeshow = false // 第三nav隐藏
      this.fourshow = false
      this.oneliIndex = index
      this._newArr(this.showCityList, -1) // 清除市级高亮
      this.showDeter = false
    },

    getCityId: function (code, input, index) { // 点击第二个li
      this.selectNameList.push(input)
      this.titleIndex = Number
      this.city = code
      this.City = input
      this.showProvince = false
      this.showCity = false
      this.showDistrict = true
      this.showArea = false
      // this.showDistrictList = this._filter(this.showCityList, 'district', this.city)
      this._GetAreaByLevel(code, 2)
      // 选择当前添加active
      this.showCityList.map(a => { a.selected = false })
      this.showCityList[index].selected = true
      this.twoliIndex = index
      this.threeshow = true // 给第三个nav显示
      this.fourshow = false

      this.$nextTick(() => {
        let container = document.querySelector('.district')
        let line = container.querySelector('.line')
        let dian = document.querySelectorAll('.address-title img')
        let l = container.offsetLeft - dian[1].offsetLeft - dian[0].offsetLeft - $('.address-title img').width()
        line.style.left = -l + 'px'
        line.style.width = l + 'px'
      })
      this.District = '' // 第三nav置空
      this.countyArea = ''
      this._newArr(this.showDistrictList, -1) // 清除区级高亮
      this.showDeter = false
    },

    getDistrictId: function (code, input, index) {
      this.selectNameList.push(input)
      this.titleIndex = Number
      this.district = code
      this.District = input
      this.showProvince = false
      this.showCity = false
      this.showDistrict = false
      this.showArea = true
      this._GetAreaByLevel(code, 3)
      this.showDistrictList.map(a => { a.selected = false })
      this.showDistrictList[index].selected = true
      this.fourshow = true
      this.$nextTick(() => {
        let container = document.querySelector('.countyArea')
        let line = container.querySelector('.line')
        let dian = document.querySelectorAll('.address-title img')
        let l = container.offsetLeft - -dian[2].offsetLeft - dian[1].offsetLeft - dian[0].offsetLeft - $('.address-title img').width()
        line.style.left = -l + 'px'
        line.style.width = l + 'px'
      })
      this.countyArea = ''
      this._newArr(this.countyAreaList, -1) // 清除区级高亮
      this.showDeter = false
    },

    getCountyAreaId(code, input, index) {
      this.countyAreaCode = code
      this.selectNameList.push(input)
      this.titleIndex = Number
      //this.district = code
      this.countyArea = input
      this.countyAreaList.map(a => { a.selected = false })
      this.countyAreaList[index].selected = true
      // 选取县区选项之后关闭弹层
      this.showDeter = true
      this.userAddress = this.Province + '-' + this.City + '-' + this.District + '-' + this.countyArea
      this.codeAddress = this.province + '_'+ this.city + '_'+ this.district + '_' + code
      this.myCityShow = false
      this.islayout = false
      this.isFlag = false
      this.$emit('callback', this.userAddress, this.codeAddress)
    },

    provinceSelected: function () {
      // 选项页面的切换
      this.showProvince = true
      this.showArea = false
      this.showCity = false
      this.showDistrict = false
    },

    citySelected: function () {
      this.titleIndex = 2
      this.showProvince = false
      this.showArea = false
      this.showCity = true
      this.showDistrict = false
      if (this.$route.query.data !== undefined) {
        this.$nextTick(() => { // 让li标签回到顶部
          this._gotoTop('.citJuli', 1)
        })
      }
    },

    districtSelected: function () { // 第三个选择
      this.showProvince = false
      this.showCity = false
      this.showArea = false
      this.showDistrict = true
      if (this.$route.query.data !== undefined) {
        this.$nextTick(() => { // 让li标签回到顶部
          this._gotoTop('.disJuli', 2)
        })
      }
    },

    areaSelected() {
      this.showProvince = false
      this.showCity = false
      this.showDistrict = false
      this.showArea = true
      if (this.$route.query.data !== undefined) {
        this.$nextTick(() => { // 让li标签回到顶部
          this._gotoTop('.areaJuli', 3)
        })
      }
    }


  },

  beforeDestroy () {
    document.querySelector('body').style.backgroundColor = '#fff'
  }

}
</script>
<style scoped lang="scss">
.line-container {
  position: relative;
  span {
    position: absolute;
    background-color: #2F54EB;
    top: 50%;
    width: 0px;
    transition: .4s;
  }
  .line{
    height: 1px;
  }
}
.select-city{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 10000;
  .address{
    position: fixed;
    bottom:0;
    left:0;
    z-index:121;
    background:#fff;
    width:100%;
    height: calc(100vh - 1.99rem);
    overflow: hidden;
    transition: height .5s;
    font-family:PingFangSC-Medium,PingFangSC;
    border-radius: 0.4rem 0.4rem 0px 0px;
    padding: 0.4rem;

    .top{
      font-size: .36rem;
      font-weight: 500;
      color: #333333;
      display: flex;
      justify-content: space-between;
      img{
        width: 0.32rem;
        height: 0.32rem;
      }
    }
    .address-title{
      margin-top: .48rem;
      width: 100%;
      display: flex;
     // justify-content: space-around;
      font-size: 0.3rem;
      font-weight: 400 !important;
      border-bottom: 1px solid #F1F1F1;
      padding-bottom: .3rem;
      overflow: hidden;
      div:not(:first-child){
        margin-left: 0.8rem;
      }
      .accolor{
        color: #333333;
      }
      .color{
        color: #2F54EB;
      }
      img{
        display: block;
        margin-top: 0.2rem;
        width: 0.22rem;
        height: 0.22rem;
      }

    }
    .circle{
      img{
        width: 0.22rem;
        height: 0.22rem;
      }
    }
    .addList{
      font-size: 0.3rem;
      font-weight: 400 !important;
      padding-bottom: 0.4rem;
      color:#262e31;
      line-height: 0.42rem;
    }
    .s-title{
      font-size: 0.24rem;
      color: #C0C0C0;
      display: block;
      padding: .24rem 0;
    }
    /* 修改的格式 */
    ul{
      height: calc(100% - .82rem);
      overflow:auto;
      padding-bottom: 0.5rem;
      li{
        list-style: none;
      }
    }
    ul .active{
      color: #2F54EB;
    }
    ul .active span::after{
      content: '';
      background-image: url(../../src/assets/mall/select.png);
      width: .4rem;
      height: .2rem;
      background-repeat: no-repeat;
      background-size: .2rem .13rem;
      background-position: left .16rem center;
      display: inline-block;
    }
  }
  .layout{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:120;
    opacity: 0;
    transition: all .5s;
    background:rgb(53, 58, 60);
    visibility: hidden;
  }
  .layoutBg{
    opacity: .7;
    visibility: visible;
  }
}
.determine{
  display: inline-block;
  width: .75rem;
  text-align: center;
  float: right;
  height: .82rem;
  line-height: .82rem;
  margin-right: .3rem;
  color: #2F54EB;
  font-size: .28rem;
}
</style>
