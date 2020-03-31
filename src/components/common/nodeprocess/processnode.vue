<template>

  <!-- 复杂图形 -->
  <div class="zkfprocessnode" :class="[
           nodeType ? 'zkf-nodeType--' + nodeType : 'zkf-nodeType--base',
           status? 'zkf-status--' + Dark +'-' + status: `zkf-status--${Dark}base`,
           high? 'zkf-high--' + high: 'zkf-high--base',
        ]" :style="[
            {'left': nodeLeft ? nodeLeft: ''},
            {'top': nodeTop ? nodeTop: ''},
            {'width': nodeWidth ? `${nodeWidth}px`: ''},
            {'height': nodeHeight ? `${nodeHeight}px`: ''}
          ]" v-if="exist? exit : true" v-show="show? show : true" @dblclick.stop="EditNode" @mousedown="MousedownNode($event)" @mouseup="MouseupNode($event)" @click.stop="ClickNode" @contextmenu.prevent="ContextNode($event)">
    <div class="shape2" :class="status? 'zkf-status--' + Dark +'-' + status: `zkf-status--${Dark}base`"></div>
    <div class="shape3" :class="status? 'zkf-status--' + Dark +'-' + status: `zkf-status--${Dark}base`"></div>
    <div class="checkdiv">
      <i class="el-icon-circle-check" v-if="pageflag ==='all'" :class="dragselect === 'all'? 'batched': 'unbatch'" @click.stop="batch()" @mousedown.stop="init" @mouseup.stop="init" @dblclick.stop="init"></i>
    </div>
    <!-- 如何优化鼠标上移功能 -->
    <!-- <el-tooltip :class="'zkf-tooltip-'+ Dark" :effect="Dark" placement="top-start">
      <div slot="content">etl_id：{{itemdata.nodeparam.etl_id}}</br>名字：{{title}}</br>执行状态: {{itemstate}}<br/>行数：{{itemdata.data.s_etl_web_run.rows}}</br>执行时间(秒)：{{itemdata.data.s_etl_web_run.secs}}</div> -->
    <div class="shape1" :class="status && nodeType==='deal'? 'zkf-status--' + Dark +'-' + status: `zkf-status--${Dark}base`">{{title}}</div>
    <!-- </el-tooltip> -->
  </div>
</template>
<style lang="scss">
.zkfprocessnode {
  position: absolute;
  line-height: 36px;
  text-align: center;
  -webkit-user-select: none;
  /* Chrome/Safari/Opera */
  -khtml-user-select: none;
  /* Konqueror */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
           not supported by any browser */
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  /* Firefox */
  -webkit-box-sizing: border-box;
  /* Safari */
  .delecticon {
    position: absolute;
    width: 16px;
    height: 16px;
    font-size: 10px;
    top: 1px;
    right: 1px;
    overflow: hidden;
    line-height: 16px;
    box-shadow: 0px 0px 0px #58afda, 0px 0px 0px #92aebb, 0px 0px 0px #58afda,
      0px 0px 0px #58afda;
  }
  .checkdiv {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0px;
    right: 1px;
    z-index: 10;
    color: rgba(131, 133, 134, 0.2);
  }
  .batched {
    color: rgba(2, 56, 18, 0.7);
  }
  .unbatch {
    color: rgba(131, 133, 134, 0.2);
  }
  .checkdiv:hover {
    cursor: pointer;
  }
  .shape1:hover {
    cursor: move;
  }
  .shape1 {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.zkf-tooltip-light {
}
.zkf-tooltip-dark {
}
.zkf-nodeType--process {
  .shape1 {
    height: 36px;
    padding: 0px 10px;
    position: relative;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    /* Firefox */
    -webkit-box-sizing: border-box;
    /* Safari */
  }
  .shape1:hover {
    cursor: move;
  }
  .shape2 {
    width: 12px;
    height: 18px;
    position: absolute;
    top: 0px;
    right: -5px;
    -webkit-transform: skew(-10deg);
    -moz-transform: skew(-10deg);
    -o-transform: skew(-10deg);
    -ms-transform: skew(-10deg);
  }
  .shape3 {
    width: 12px;
    height: 18px;
    position: absolute;
    top: 18px;
    right: -5px;
    -webkit-transform: skew(10deg);
    -moz-transform: skew(10deg);
    -o-transform: skew(10deg);
    -ms-transform: skew(10deg);
  }
}

.zkf-nodeType--deal {
  .shape1 {
    height: 36px;
    padding: 0px 10px;
    min-width: 100px;
    position: relative;
    border: 1px solid;
    box-shadow: 0px 0px 0px rgba(255, 255, 255, 0);
  }

  .shape2 {
    height: 36px;
    padding: 0px 10px;
    min-width: 100px;
    position: absolute;
    top: 2px;
    left: 2px;
    color: #2d09ce;
    box-shadow: 0px 0px 0px rgba(255, 255, 255, 0);
  }
  .shape3 {
    height: 36px;
    padding: 0px 10px;
    min-width: 100px;
    position: absolute;
    top: 2px;
    left: 2px;
    border: 1px solid;
    box-shadow: 0px 0px 0px rgba(255, 255, 255, 0);
  }
}

.zkf-nodeType--base {
  height: 36px;
  padding: 0px 10px;
  min-width: 100px;
  // border: 1px solid #58afda;
  position: absolute;
  background-color: rgba(181, 241, 252, 1);
  .shape2,
  .shape3 {
    display: none;
  }
}

.zkf-nodeType--rect {
  padding: 0px 10px;
  min-width: 100px;
  height: 36px;
  border: 1px solid #ccc;
  border-radius: 5px;
  .shape2,
  .shape3 {
    display: none;
  }
}

.zkf-nodeType--rectbig {
  min-width: 100px;
  height: 36px;
  // border: 1px solid #ccc;
  border-radius: 20px;
  .shape1 {
    height: 36px;
    padding: 0px 10px;
    min-width: 100px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    /* Firefox */
    -webkit-box-sizing: border-box;
    /* Safari */
  }
  .shape2,
  .shape3 {
    display: none;
  }
}

.zkf-nodeType--parallelogram {
  padding: 0px 10px;
  min-width: 100px;
  height: 36px;
  border: 1px solid #ccc;
  transform: skew(-30deg);
  -webkit-transform: skew(-30deg);
  -moz-transform: skew(-30deg);
  -o-transform: skew(-30deg);
  -ms-transform: skew(-30deg);
  .shape2,
  .shape3 {
    display: none;
  }
}

.zkf-nodeType--circle {
  width: 50px;
  height: 50px;
  line-height: 40px;
  border: 1px solid #ccc;
  border-radius: 50%;
  .shape1 {
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    /* Firefox */
    -webkit-box-sizing: border-box;
    /* Safari */
  }
  .shape2,
  .shape3 {
    display: none;
  }
}

.zkf-status--light-base {
  background-color: #d6e6f7;
  border-color: rgba(131, 133, 134, 0.2);
  color: #1563a7;
  //  box-shadow: 3px 3px 3px #c9ced2;
}

.zkf-status--light-primary {
  background-color: #61a7f3;
  border-color: rgba(32, 160, 255, 0.2);
  color: #f6f6f8;
  // box-shadow: 3px 3px 3px #a7a7ea;
}

.zkf-status--light-gray {
  background-color: #dedede;
  border-color: #b5b7b9;
  color: #6e6f6f;
  //box-shadow: 3px 3px 3px #b9b8b8;
}

.zkf-status--light-success {
  background-color: #b4f3cf;
  border-color: rgba(18, 206, 102, 0.2);
  color: #07790b;
  // box-shadow: 5px 2px 2px #13ab5e;
}

.zkf-status--light-warning {
  background-color: #f1d592;
  border-color: rgba(247, 186, 41, 0.2);
  color: #af7c05;
  // box-shadow: 3px 3px 3px #f7ba2a;
}

.zkf-status--light-danger {
  background-color: #e69d9d;
  border-color: rgba(255, 73, 73, 0.2);
  color: #ff4949;
  // box-shadow: 3px 3px 3px #ec8383;
}

.zkf-status--light-xx {
  background-color: rgba(250, 167, 217, 0.6);
  border-color: rgba(245, 158, 210, 0.7);
  color: #f148aa;
  // box-shadow: 3px 3px 3px #f148aa;
}

.zkf-status--dark-base {
  background-color: #0c7689;
  border-color: #78e1e2a6;
  color: #252727;
  // box-shadow: 0px 0px 0px #58afda, 3px 3px 3px #92aebb, 0px 0px 0px #58afda,
  //  0px 0px 0px #58afda;
}

.zkf-status--dark-primary {
  background-color: #0f9db6;
  border-color: rgba(181, 241, 252, 0.7);
  color: #0a3131;
  // box-shadow: 0px 0px 0px #72acca, 5px 3px 1px #72acca, 0px 0px 0px #72acca,
  //   3px 0px 0px #72acca;
}

.zkf-status--dark-gray {
  background-color: #4d4e50;
  border-color: #9ea0a5;
  color: #010710;
  //box-shadow: 2px 2px 2px #c4c3c3;
}

.zkf-status--dark-success {
  background-color: #0f753d;
  border-color: rgba(18, 206, 102, 0.4);
  color: #f8faf9;
  // box-shadow: 3px 3px 3px #339665;
}

.zkf-status--dark-warning {
  background-color: #d97920;
  border-color: rgba(247, 186, 41, 0.4);
  color: #3d2d07;
  // box-shadow: 3px 3px 3px #f7ba2a;
  // box-shadow: 0px 0px 0px #f7ba2a, 6px 3px 1px #86620c, 0px 0px 0px #86620c,
  //   3px 0px 0px #86620c;
}

.zkf-status--dark-danger {
  background-color: #a41010fc;
  border-color: rgba(255, 73, 73, 0.4);
  color: #e6d4d4;
  // box-shadow: 0px 0px 0px #ff4949, 6px 3px 1px #ff4949, 0px 0px 0px #ff4949,
  //   3px 0px 0px #ff4949;
}

.zkf-status--dark-xx {
  background-color: rgba(250, 167, 217, 0.5);
  border-color: rgba(245, 158, 210, 0.4);
  color: #f148aa;
  // box-shadow: 3px 3px 3px #f148aa;
}
.zkf-high--high {
  background-color: #bba40f;
  border-color: rgba(136, 223, 22, 0.4);
  color: #e6d4d4;
  .shape2 {
    background-color: #bba40f;
  }
  .shape3 {
    background-color: #bba40f;
  }
}
.zkf-status--dark--sourch {
  box-shadow: 0px 0px 20px #f3f3f3 !important;
  z-index: 10;
}
.zkf-status--light--sourch {
  box-shadow: 0px 0px 20px #222222 !important;
  z-index: 10;
}
</style>
<script>
export default {
  props: ['nodeType', 'Dark', 'nodeLeft', 'nodeTop', 'nodeWidth', 'nodeHeight', 'status', 'show', 'exist', 'title', 'high', 'itemdata', 'dragselect', 'pageflag'],
  data () {
    return {
      nodeTypetemp: this.nodeType,
      itemstate: '',
    }
  },

  computed: {

  },
  watch: {
    status (val) {
      this.itemstate = this.switchtype(this.status);
    }
  },
  methods: {
    init () { },
    batch () {
      this.$emit('SelctedNode');
      console.log('batch');
    },
    EditNode () {
      this.$emit('EditNode', this.nodeTypetemp);
    },
    MousedownNode (e) {
      //  console.log('MousedownNode', e, this.data.nodeparam.nodeWidth);
      this.$emit('MousedownNode', e);
    },
    MouseupNode (e) {
      this.$emit('MouseupNode', e);
    },
    ContextNode (e) {
      this.$emit('ContextNode', e);
    },
    ClickNode () {
      // console.log('ppppp');
    },
    switchtype (val) {
      let type;
      // 数值转图形
      switch (val) {
        case 'base':
          type = '待执行';
          break;
        case 'primary':
          type = '执行';
          break;
        case 'success':
          type = '成功';
          break;
        case 'danger':
          type = '失败';
          break;
        case 'warning':
          type = '未知';
          break;
        default:
          type = '灰色';
      };

      return type;
    }
  },
  mounted () {
    this.itemstate = this.switchtype(this.status);
  },
  beforeUpdate () { },
  updated () { },
}
</script>