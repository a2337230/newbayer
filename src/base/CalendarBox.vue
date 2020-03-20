<template>
  <div class="calendar">
    <!-- 表头 -->
    <Calendar
      :markDate="markTime"
      ref="Calendar"
      class="Calendar"
    ></Calendar>
  </div>
</template>
<script>
import Calendar from 'vue-calendar-component'
import moment from 'moment'
export default {
  name: 'calendarBox',
  data () {
    return {
      // 签到日期标注
      markTime: ['2019/12/18', '2019/12/10']
    }
  },
  methods: {
    changeMonth (val, month) {
      let now = false
      if (month == moment().month() + 1) {
        now = true
      }
      this.$refs.Calendar.ChoseMonth(val, now)
    }
  },
  components: {
    Calendar
  }
}
</script>
<style lang="scss" scoped>
.calendar {
  pointer-events: none;
  /deep/ .wh_content {
    display: flex;
    justify-content: space-around;
  }
  /deep/ .wh_other_dayhide {
    color: transparent;
  }
  /deep/ .wh_top_changge {
    display: none;
  }
  /deep/ .wh_top_changge li{
    color:#32373C;
  }
  /deep/ .wh_content_all{
    background-color: #fff;
    padding-top: .4rem;
  }
  /deep/ .wh_content_item {
    color:#32373C
  }
  /deep/ .wh_jiantou1{
    border-top: 2px solid #32373C;
    border-left: 2px solid #32373C;
  }
  /deep/ .wh_jiantou2{
    border-top: 2px solid #32373C;
    border-right: 2px solid #32373C;
  }
  /deep/ .wh_item_date {
    font-size: .26rem;
  }
  /deep/ .wh_isToday {
    color:#fff;
    //margin-top: 0.2rem;
    width:0.4rem;
    height:0.4rem;
    background-color: #2F54EB!important;
  }
  /deep/ .wh_content_item {
    display: flex;
    display: -webkit-flex;
  }
  /deep/ .wh_chose_day {
    pointer-events: none;
    color:#32373C;
    width:0.4rem;
    height:0.4rem;
    line-height: 0.4rem;
    background-color: transparent !important;
  }
  /deep/ .wh_content_item > .wh_isMark{
    background-color: #fff;
    &:after {
      width:0.06rem;
      height:0.06rem;
      border-radius: 50%;
      background-color: #2F54EB;
      content: "";
      position: absolute;
      bottom: .1rem;
      left:50%;
      // margin-left: -0.03rem;
    }
  }
}
</style>