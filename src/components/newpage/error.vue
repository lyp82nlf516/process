<template>
  <div class="errorbox">
    <div class="titlebox">
      <img src="../../assets/img/main/notice.png" alt="" srcset="">
      <span class="name">{{this.msg}}</span>
    </div>
    <div class="housebox">
      <!-- 小房子 -->
    </div>
  </div>
</template>
<style lang="scss">
.errorbox {
  width: 100%;
  height: 100%;
  .titlebox {
    height: 40px;
    width: 100%;
    line-height: 40px;
    img {
      float: left;
      margin: 5px 0 0 3px;
    }
    .name {
      float: left;
      margin-left: 10px;
      font-weight: bolder;
      font-size: 16px;
    }
  }
  .housebox {
    /* width: 400px;
      height: 400px;
      position: absolute;
      margin: 0;
      top */
  }
}
</style>
<script>
export default {
  data () {
    return {
      msg: '',
    };
  },
  created () {
  },
  components: {},
  mounted () {
    if (this.$route.params.type === 'empty') {
      this.msg = '您没有权限查看报表，请联系管理员为您分配权限！'
    } else if (this.$route.params.type === 'move') {
      this.msg = '职位变动，请联系管理员'
    }
  },
  methods: {}
};

</script>
