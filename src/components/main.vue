<template>
  <div class="report-forms">
    <router-view ref="testref" @testrefevent="testrefevent" @Changeheadshow="Changeheadshow"></router-view>
  </div>
</template>
<style lang="scss">
.report-forms {
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 600px;
  min-width: 768px;
  background: #f9fafe;
  .main-head {
    height: 60px;
    line-height: 60px;
    width: 100%;
    position: relative;
    background-color: rgba(123, 126, 255, 0.9);
    color: #fff;
    .header-left {
      float: left;
      width: 20%;
      background-color: rgba(109, 113, 239, 1);
      .sqbox {
        height: 60px;
        width: 20px;
        float: left;
        margin-left: 10px;
        cursor: pointer;
        img {
          width: 20px;
          height: 18px;
          margin-top: 26px;
        }
      }
      .img_house {
        margin-left: 10px;
        margin-top: 8px;
        width: 40px;
        height: 41px;
      }
      .bbtitle {
        float: left;
        margin-left: 5px;
        letter-spacing: 3px;
        -webkit-font-size: 16px;
        font-size: 16px;
        font-weight: bolder;
        line-height: 32px;
        margin-top: 17px;
      }
    }
    img {
      line-height: 60px;
      width: 30px;
      height: 30px;
      display: block;
      float: left;
      margin-top: 20px;
    }
    .userbox {
      span {
        display: inline-block;
        font-size: 14px;
        line-height: 30px;
        font-weight: bolder;
        margin-left: 10px;
        margin-right: 22px;
        margin-top: 20px;
      }
    }
    .exitbox {
      height: 100%;
      float: right;
      .exitimg {
        width: 24px;
        height: 20px;
        margin: 26px 10px 0 15px;
        cursor: pointer;
      }
    }
    .userbox {
      // width: 500px;
      height: 100%;
      float: right;
    }
    .menuz {
      color: #ccc;
      line-height: 60px;
      margin-left: 20px;
      font-size: 20px; // float: left;
    }
  }
  /* .arrowallbox {
      width: 20px;
      height: calc(100% - 60px);
      float: left;
      background-color: rgba(17, 28, 66, 0);
      position: absolute;
      top: 60px;
      z-index: 5;
      text-align: center;
      .arrowbox {
        width: 20px;
        height: 50px;
        background-color: rgba(17, 28, 66, 0.3);
        line-height: 50px;
        float: left;
        position: absolute;
        top: 300px;
        z-index: 5;
        text-align: center;
      }
    }
    .arrowallbox:hover {
      cursor: pointer;
    }
    .arrowboxleft {
     opacity: 0;
    }
    .arrowallbox:hover .arrowboxleft {
      opacity: 1;
    }
    .arrowboxright {
      opacity: 0;
    }
    .arrowallbox:hover .arrowboxright {
      opacity: 1;
    } */
  .main-body-leftbox {
    height: calc(100% - 60px);
    width: 180px;
    position: absolute;
    top: 60px;
    left: 0; // background-color: #39afd5;
    background-color: #fafcfe;
    .leftcontent {
      overflow: auto;
      height: 100%;
      width: 100%; // background-color: red;
      .submenuzkf .el-menu {
        background-color: #cdeaec;

        .el-menu-item {
          // color: #000;
        }
        .activeclass {
          color: #20a0ff;
          font-size: 16px;
          background-color: #d1dbe5;
        }
      }
      .router {
        color: #fff;
      }
      .router:hover {
        color: #2d8cf0;
      }
      .is-opened {
        background-color: #cdeaec; // .el-submenu__title {
        //   color: #000;
        // }
      }
      .mainsubmenu {
        background-color: #fafcfe;
        .el-icon-menu {
          color: #92ceee;
        }
        i {
          color: #666;
        }
      }
    }
  }
  .main-body-rightbox {
    width: calc(100% - 2px); // padding-left: 10px;
    height: calc(100% - 60px);
    position: absolute;
    top: 60px; // left: 210px;
    background-color: #f0f0f0;
    border-left: 1px solid #666;
  }
}

@media (max-width: 1070px) {
  .bbtitle {
    letter-spacing: 0px !important;
  }
}

@media (max-width: 930px) {
  .bbtitle {
    font-size: 14px !important;
  }
  .img_house {
    width: 30px !important;
    height: 30px !important;
    margin-top: 15px !important;
  }
}
</style>
<script>
import {
  //  jobTransfer
} from '@/services/query';
import {
  setSessionStore,
  getSessionStore,
} from '@/utils/mUtils';
export default {
  data () {
    return {
      logout: `http://beijing.cbs.bacic5i5j.com/base/system/logout.htm`,
      // logout: `http://dev.cbs.bacic5i5j.com/base/system/logout.htm`,
      privilegeMenuCodeflag: 'rpt',
      user: {
        userId: '',
        userName: '用户名'
      },
      defaultopeneds: ['main'],
      menuflag: false,
      headflag: true,
      menuleftdata: [{
        'privilegeMenuId': '',
        'privilegeMenuName': '',
        'privilegeMenuCode': '',
        'subList': [],
      }],
      items: [{
        message: 'Foo'
      },
      {
        message: 'Bar'
      }
      ]
    }
  },
  computed: {},
  created () { },
  mounted () {
  },
  methods: {
    // 用户退出
    Userexit () {
      //  window.location.href = 'http://dev.cbs.bacic5i5j.com/base/system/logout.htm';
      // 关闭窗口的函数，现在暂时不用调用
      // this.closeWindow();
    },
    // 关闭窗口的函数，现在暂时不用调用
    closeWindow () {
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        window.close();
      } else {
        var browserName = navigator.appName;
        if (browserName === 'Netscape') {
          window.open('', '_self', '');
          window.close();
        } else {
          if (browserName === 'Microsoft Internet Explorer') {
            window.open('', '_parent', '');
            window.close();
          }
        }
      }
    },
    setCookie () {
      document.cookie = 'sid=myCookie4; domain=.cbs.bacic5i5j.com;';
    },
    topath (item) {
      this.privilegeMenuCodeflag = item.privilegeMenuCode;
      setSessionStore('mlitem', JSON.stringify(item));
      if (item.privilegeMenuCode === 'model') {
        this.$router.push({
          path: '/customallpage',
          query: {
            'url': item.privilegeMenuUrl,
          }
        });
        // initmodel
        if (this.$refs.testref.initmodel !== undefined) {
          this.$refs.testref.initmodel();
        }
      } else {
        this.$router.push({
          path: '/' + item.privilegeMenuCode,
          query: {
            'url': item.privilegeMenuUrl
          }
        });
        if (this.$refs.testref.freash !== undefined) {
          this.$refs.testref.freash();
        }
      }
    },

    Changemenushow () {
      this.menuflag = !this.menuflag;
      if (this.menuflag) {
        $('.main-body-rightbox').css({
          'left': 170,
          'width': 'calc(100% - 170px)'
        })
        if (this.$refs.testref.testref !== undefined) {
          this.$refs.testref.testref();
        }
      } else {
        $('.main-body-rightbox').css({
          'left': 0,
          'width': 'calc(100% - 1px)'
        })
        if (this.$refs.testref.testref !== undefined) {
          this.$refs.testref.testref();
        }
      }
      this.resetposition();
    },
    Changeheadshow (param) {
      this.headflag = param;
      if (this.headflag) {
        $('.main-body-leftbox').css({
          'top': '60px',
          'height': 'calc(100% - 60px)'
        })
        $('.main-body-rightbox').css({
          'top': '60px',
          'height': 'calc(100% - 60px)'
        })
        if (this.$refs.testref.testref !== undefined) {
          this.$refs.testref.testref();
        }
      } else {
        $('.main-body-leftbox').css({
          'top': '0px',
          'height': 'calc(100% - 1px)'
        })
        $('.main-body-rightbox').css({
          'top': '0px',
          'height': 'calc(100% - 1px)'
        })
        if (this.$refs.testref.testref !== undefined) {
          this.$refs.testref.testref();
        }
      }
      this.resetposition();
    },
    handleOpen (key, keyPath) {
      this.defaultopeneds = keyPath;
      setSessionStore('ml', JSON.stringify(this.defaultopeneds));
    },
    // 目录刷新
    testrefevent () {
      let geiml = getSessionStore('ml');
      console.log(geiml);
    },
    handleClose (key, keyPath) { },
    resetposition () {
      //   chart.resize();
      let otherone = parseInt($('.otherboxone').width()) + 1;
      let othertwo = parseInt($('.otherboxtwo').width()) + 1;
      let fatherboxflag = parseInt($('#onebox').attr('fatherbox'));
      if (fatherboxflag === 1) {
        $('#onebox').css({
          'top': 0,
          'left': 0,
          'width': 'calc(25% - 2px)'
        })
      } else if (fatherboxflag === 2) {
        $('#onebox').css({
          'top': 0,
          'left': otherone,
          'width': 'calc(50% - 2px)'
        })
      } else if (fatherboxflag === 3) {
        $('#onebox').css({
          'top': 0,
          'left': otherone + othertwo,
          'width': 'calc(25% - 2px)'
        })
      }
    }
  }
}

</script>
